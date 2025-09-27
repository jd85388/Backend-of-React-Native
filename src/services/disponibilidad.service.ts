import { Disponibilidad, CitaProgramada, IDisponibilidad, ICitaProgramada } from '../models/disponibilidad.js';

export class DisponibilidadService {

    // Obtener todas las especialidades disponibles
    async obtenerEspecialidades(): Promise<any[]> {
        const especialidades = await Disponibilidad.aggregate([
            { $match: { estado: true } },
            { $group: { 
                _id: "$especialidad.codigo",
                nombre: { $first: "$especialidad.nombre" },
                descripcion: { $first: "$especialidad.descripcion" },
                medicosDisponibles: { $sum: 1 }
            }},
            { $sort: { nombre: 1 } }
        ]);
        return especialidades;
    }

    // Obtener médicos por especialidad
    async obtenerMedicosPorEspecialidad(codigoEspecialidad: string): Promise<any[]> {
        const medicos = await Disponibilidad.find({
            'especialidad.codigo': codigoEspecialidad,
            estado: true
        }).select('medico especialidad consultorio tarifa').sort({ 'medico.apellido': 1 });
        
        return medicos;
    }

    // Obtener disponibilidad de un médico específico
    async obtenerDisponibilidadMedico(disponibilidadId: string): Promise<IDisponibilidad | null> {
        return await Disponibilidad.findById(disponibilidadId);
    }

    // Generar horarios disponibles para una fecha específica
    async obtenerHorariosDisponibles(disponibilidadId: string, fecha: Date): Promise<any[]> {
        const disponibilidad = await Disponibilidad.findById(disponibilidadId);
        if (!disponibilidad) {
            throw new Error('Disponibilidad no encontrada');
        }

        // Verificar si la fecha está en fechas no disponibles
        const fechaSinHora = new Date(fecha);
        fechaSinHora.setHours(0, 0, 0, 0);
        
        const fechaNoDisponible = disponibilidad.fechasNoDisponibles.some(fechaNo => {
            const fechaNoSinHora = new Date(fechaNo);
            fechaNoSinHora.setHours(0, 0, 0, 0);
            return fechaNoSinHora.getTime() === fechaSinHora.getTime();
        });

        if (fechaNoDisponible) {
            return [];
        }

        // Obtener día de la semana en español
        const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
        const diaSemana = diasSemana[fecha.getDay()];

        // Buscar horario para este día
        const horarioDia = disponibilidad.horarios.find(h => h.dia === diaSemana);
        if (!horarioDia) {
            return [];
        }

        // Generar horarios posibles
        const horariosDisponibles: any[] = [];
        const horaInicio = this.convertirHoraAMinutos(horarioDia.horaInicio);
        const horaFin = this.convertirHoraAMinutos(horarioDia.horaFin);
        const intervalo = horarioDia.intervaloMinutos;

        for (let minutos = horaInicio; minutos < horaFin; minutos += intervalo) {
            const hora = this.convertirMinutosAHora(minutos);
            
            // Verificar si está en horario de descanso
            const enDescanso = horarioDia.descansos?.some(descanso => {
                const inicioDescanso = this.convertirHoraAMinutos(descanso.inicio);
                const finDescanso = this.convertirHoraAMinutos(descanso.fin);
                return minutos >= inicioDescanso && minutos < finDescanso;
            });

            if (!enDescanso) {
                horariosDisponibles.push({
                    hora,
                    disponible: true,
                    duracionMinutos: intervalo
                });
            }
        }

        // Verificar citas ya programadas
        const citasExistentes = await CitaProgramada.find({
            disponibilidadId,
            fecha: fechaSinHora,
            estado: { $in: ['programada', 'confirmada', 'en_curso'] }
        }).select('hora duracionMinutos');

        // Marcar horarios ocupados
        citasExistentes.forEach(cita => {
            const indiceCitaExistente = horariosDisponibles.findIndex(h => h.hora === cita.hora);
            if (indiceCitaExistente !== -1) {
                horariosDisponibles[indiceCitaExistente].disponible = false;
                horariosDisponibles[indiceCitaExistente].ocupadaPor = 'Cita programada';
            }
        });

        return horariosDisponibles;
    }

    // Reservar una cita
    async reservarCita(datosReserva: {
        disponibilidadId: string;
        pacienteId: string;
        fecha: Date;
        hora: string;
        motivo: string;
        observacionesPaciente?: string;
    }): Promise<ICitaProgramada> {
        const { disponibilidadId, pacienteId, fecha, hora, motivo, observacionesPaciente } = datosReserva;

        // Verificar disponibilidad del horario
        const horariosDisponibles = await this.obtenerHorariosDisponibles(disponibilidadId, fecha);
        const horarioSeleccionado = horariosDisponibles.find(h => h.hora === hora && h.disponible);
        
        if (!horarioSeleccionado) {
            throw new Error('El horario seleccionado no está disponible');
        }

        // Verificar que no existe una cita duplicada
        const fechaSinHora = new Date(fecha);
        fechaSinHora.setHours(0, 0, 0, 0);

        const citaExistente = await CitaProgramada.findOne({
            disponibilidadId,
            fecha: fechaSinHora,
            hora,
            estado: { $in: ['programada', 'confirmada', 'en_curso'] }
        });

        if (citaExistente) {
            throw new Error('Ya existe una cita programada para este horario');
        }

        // Crear nueva cita
        const nuevaCita = new CitaProgramada({
            disponibilidadId,
            pacienteId,
            fecha: fechaSinHora,
            hora,
            duracionMinutos: horarioSeleccionado.duracionMinutos,
            motivo,
            observacionesPaciente,
            estado: 'programada'
        });

        return await nuevaCita.save();
    }

    // Obtener citas de un paciente
    async obtenerCitasPaciente(pacienteId: string): Promise<any[]> {
        return await CitaProgramada.find({ pacienteId })
            .populate({
                path: 'disponibilidadId',
                select: 'medico especialidad consultorio tarifa'
            })
            .sort({ fecha: 1, hora: 1 });
    }

    // Cancelar cita
    async cancelarCita(citaId: string, motivo?: string): Promise<ICitaProgramada | null> {
        return await CitaProgramada.findByIdAndUpdate(
            citaId,
            { 
                estado: 'cancelada',
                observacionesMedico: motivo || 'Cita cancelada por el paciente',
                fechaModificacion: new Date()
            },
            { new: true }
        );
    }

    // Reprogramar cita
    async reprogramarCita(citaId: string, nuevaFecha: Date, nuevaHora: string): Promise<ICitaProgramada | null> {
        const cita = await CitaProgramada.findById(citaId);
        if (!cita) {
            throw new Error('Cita no encontrada');
        }

        // Verificar disponibilidad del nuevo horario
        const horariosDisponibles = await this.obtenerHorariosDisponibles(
            cita.disponibilidadId.toString(),
            nuevaFecha
        );
        
        const horarioDisponible = horariosDisponibles.find(h => h.hora === nuevaHora && h.disponible);
        if (!horarioDisponible) {
            throw new Error('El nuevo horario no está disponible');
        }

        // Actualizar cita
        return await CitaProgramada.findByIdAndUpdate(
            citaId,
            {
                fecha: nuevaFecha,
                hora: nuevaHora,
                duracionMinutos: horarioDisponible.duracionMinutos,
                fechaModificacion: new Date()
            },
            { new: true }
        );
    }

    // Obtener agenda de un médico para un día
    async obtenerAgendaMedico(disponibilidadId: string, fecha: Date): Promise<any> {
        const fechaSinHora = new Date(fecha);
        fechaSinHora.setHours(0, 0, 0, 0);

        const citas = await CitaProgramada.find({
            disponibilidadId,
            fecha: fechaSinHora,
            estado: { $ne: 'cancelada' }
        }).populate('pacienteId', 'nombre apellido telefono email').sort({ hora: 1 });

        const disponibilidad = await Disponibilidad.findById(disponibilidadId);
        const horariosDisponibles = await this.obtenerHorariosDisponibles(disponibilidadId, fecha);

        return {
            medico: disponibilidad?.medico,
            especialidad: disponibilidad?.especialidad,
            consultorio: disponibilidad?.consultorio,
            fecha: fechaSinHora,
            citas,
            horariosDisponibles
        };
    }

    // Funciones auxiliares
    private convertirHoraAMinutos(hora: string): number {
        const [h, m] = hora.split(':').map(Number);
        return h * 60 + m;
    }

    private convertirMinutosAHora(minutos: number): string {
        const horas = Math.floor(minutos / 60);
        const mins = minutos % 60;
        return `${horas.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }

    // Poblar datos de ejemplo (solo para desarrollo)
    async poblarDatosEjemplo(): Promise<void> {
        const existe = await Disponibilidad.countDocuments();
        if (existe > 0) return;

        const datosEjemplo = [
            {
                medico: {
                    nombre: 'Carlos',
                    apellido: 'García Martínez',
                    cedula: '12345678',
                    telefono: '601-234-5678',
                    email: 'carlos.garcia@hospital.com'
                },
                especialidad: {
                    nombre: 'Cardiología',
                    codigo: 'CARD',
                    descripcion: 'Especialista en enfermedades del corazón'
                },
                consultorio: {
                    numero: '205',
                    edificio: 'Torre A',
                    piso: 2,
                    direccion: 'Hospital San Juan, Calle 123 #45-67',
                    telefono: '601-234-5679'
                },
                horarios: [
                    {
                        dia: 'lunes',
                        horaInicio: '08:00',
                        horaFin: '17:00',
                        intervaloMinutos: 30,
                        descansos: [{ inicio: '12:00', fin: '13:00' }]
                    },
                    {
                        dia: 'martes',
                        horaInicio: '08:00',
                        horaFin: '17:00',
                        intervaloMinutos: 30,
                        descansos: [{ inicio: '12:00', fin: '13:00' }]
                    },
                    {
                        dia: 'miercoles',
                        horaInicio: '08:00',
                        horaFin: '17:00',
                        intervaloMinutos: 30,
                        descansos: [{ inicio: '12:00', fin: '13:00' }]
                    },
                    {
                        dia: 'jueves',
                        horaInicio: '08:00',
                        horaFin: '17:00',
                        intervaloMinutos: 30,
                        descansos: [{ inicio: '12:00', fin: '13:00' }]
                    },
                    {
                        dia: 'viernes',
                        horaInicio: '08:00',
                        horaFin: '16:00',
                        intervaloMinutos: 30,
                        descansos: [{ inicio: '12:00', fin: '13:00' }]
                    }
                ],
                fechasNoDisponibles: [],
                tarifa: 150000
            },
            {
                medico: {
                    nombre: 'Ana',
                    apellido: 'López Silva',
                    cedula: '87654321',
                    telefono: '601-987-6543',
                    email: 'ana.lopez@hospital.com'
                },
                especialidad: {
                    nombre: 'Medicina General',
                    codigo: 'MGEN',
                    descripcion: 'Atención médica general y preventiva'
                },
                consultorio: {
                    numero: '101',
                    edificio: 'Torre B',
                    piso: 1,
                    direccion: 'Clínica Santa María, Carrera 15 #30-20',
                    telefono: '601-987-6544'
                },
                horarios: [
                    {
                        dia: 'lunes',
                        horaInicio: '07:00',
                        horaFin: '15:00',
                        intervaloMinutos: 20,
                        descansos: [{ inicio: '11:00', fin: '11:30' }]
                    },
                    {
                        dia: 'martes',
                        horaInicio: '07:00',
                        horaFin: '15:00',
                        intervaloMinutos: 20,
                        descansos: [{ inicio: '11:00', fin: '11:30' }]
                    },
                    {
                        dia: 'miercoles',
                        horaInicio: '07:00',
                        horaFin: '15:00',
                        intervaloMinutos: 20,
                        descansos: [{ inicio: '11:00', fin: '11:30' }]
                    },
                    {
                        dia: 'jueves',
                        horaInicio: '07:00',
                        horaFin: '15:00',
                        intervaloMinutos: 20,
                        descansos: [{ inicio: '11:00', fin: '11:30' }]
                    },
                    {
                        dia: 'viernes',
                        horaInicio: '07:00',
                        horaFin: '15:00',
                        intervaloMinutos: 20,
                        descansos: [{ inicio: '11:00', fin: '11:30' }]
                    },
                    {
                        dia: 'sabado',
                        horaInicio: '08:00',
                        horaFin: '12:00',
                        intervaloMinutos: 20,
                        descansos: []
                    }
                ],
                fechasNoDisponibles: [],
                tarifa: 80000
            }
        ];

        await Disponibilidad.insertMany(datosEjemplo);
    }
}

export default new DisponibilidadService();