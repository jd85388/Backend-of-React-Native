import DisponibilidadService from '../services/disponibilidad.service';
class DisponibilidadController {
    // Obtener todas las especialidades disponibles
    async obtenerEspecialidades(req, res) {
        try {
            const especialidades = await DisponibilidadService.obtenerEspecialidades();
            res.status(200).json({
                success: true,
                message: 'Especialidades obtenidas exitosamente',
                data: especialidades
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener especialidades',
                error: error.message
            });
        }
    }
    // Obtener médicos por especialidad
    async obtenerMedicosPorEspecialidad(req, res) {
        try {
            const { codigoEspecialidad } = req.params;
            const medicos = await DisponibilidadService.obtenerMedicosPorEspecialidad(codigoEspecialidad);
            res.status(200).json({
                success: true,
                message: 'Médicos obtenidos exitosamente',
                data: medicos
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener médicos',
                error: error.message
            });
        }
    }
    // Obtener horarios disponibles para una fecha
    async obtenerHorariosDisponibles(req, res) {
        try {
            const { disponibilidadId } = req.params;
            const { fecha } = req.query;
            if (!fecha) {
                res.status(400).json({
                    success: false,
                    message: 'La fecha es requerida'
                });
                return;
            }
            const fechaSeleccionada = new Date(fecha);
            const horarios = await DisponibilidadService.obtenerHorariosDisponibles(disponibilidadId, fechaSeleccionada);
            res.status(200).json({
                success: true,
                message: 'Horarios disponibles obtenidos exitosamente',
                data: {
                    fecha: fechaSeleccionada,
                    horarios
                }
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener horarios disponibles',
                error: error.message
            });
        }
    }
    // Reservar una cita
    async reservarCita(req, res) {
        try {
            const datosReserva = req.body;
            // Validar campos requeridos
            const { disponibilidadId, pacienteId, fecha, hora, motivo } = datosReserva;
            if (!disponibilidadId || !pacienteId || !fecha || !hora || !motivo) {
                res.status(400).json({
                    success: false,
                    message: 'Todos los campos son requeridos: disponibilidadId, pacienteId, fecha, hora, motivo'
                });
                return;
            }
            const cita = await DisponibilidadService.reservarCita(datosReserva);
            res.status(201).json({
                success: true,
                message: 'Cita reservada exitosamente',
                data: cita
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al reservar cita',
                error: error.message
            });
        }
    }
    // Obtener citas de un paciente
    async obtenerCitasPaciente(req, res) {
        try {
            const { pacienteId } = req.params;
            const citas = await DisponibilidadService.obtenerCitasPaciente(pacienteId);
            res.status(200).json({
                success: true,
                message: 'Citas del paciente obtenidas exitosamente',
                data: citas
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener citas del paciente',
                error: error.message
            });
        }
    }
    // Cancelar cita
    async cancelarCita(req, res) {
        try {
            const { citaId } = req.params;
            const { motivo } = req.body;
            const citaCancelada = await DisponibilidadService.cancelarCita(citaId, motivo);
            if (!citaCancelada) {
                res.status(404).json({
                    success: false,
                    message: 'Cita no encontrada'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Cita cancelada exitosamente',
                data: citaCancelada
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al cancelar cita',
                error: error.message
            });
        }
    }
    // Reprogramar cita
    async reprogramarCita(req, res) {
        try {
            const { citaId } = req.params;
            const { nuevaFecha, nuevaHora } = req.body;
            if (!nuevaFecha || !nuevaHora) {
                res.status(400).json({
                    success: false,
                    message: 'Nueva fecha y hora son requeridas'
                });
                return;
            }
            const citaReprogramada = await DisponibilidadService.reprogramarCita(citaId, new Date(nuevaFecha), nuevaHora);
            if (!citaReprogramada) {
                res.status(404).json({
                    success: false,
                    message: 'Cita no encontrada'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Cita reprogramada exitosamente',
                data: citaReprogramada
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al reprogramar cita',
                error: error.message
            });
        }
    }
    // Obtener agenda de un médico
    async obtenerAgendaMedico(req, res) {
        try {
            const { disponibilidadId } = req.params;
            const { fecha } = req.query;
            if (!fecha) {
                res.status(400).json({
                    success: false,
                    message: 'La fecha es requerida'
                });
                return;
            }
            const agenda = await DisponibilidadService.obtenerAgendaMedico(disponibilidadId, new Date(fecha));
            res.status(200).json({
                success: true,
                message: 'Agenda del médico obtenida exitosamente',
                data: agenda
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener agenda del médico',
                error: error.message
            });
        }
    }
    // Poblar datos de ejemplo (solo para desarrollo)
    async poblarDatosEjemplo(req, res) {
        try {
            await DisponibilidadService.poblarDatosEjemplo();
            res.status(200).json({
                success: true,
                message: 'Datos de ejemplo poblados exitosamente'
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al poblar datos de ejemplo',
                error: error.message
            });
        }
    }
    // Obtener información de disponibilidad específica
    async obtenerDisponibilidad(req, res) {
        try {
            const { disponibilidadId } = req.params;
            const disponibilidad = await DisponibilidadService.obtenerDisponibilidadMedico(disponibilidadId);
            if (!disponibilidad) {
                res.status(404).json({
                    success: false,
                    message: 'Disponibilidad no encontrada'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Disponibilidad obtenida exitosamente',
                data: disponibilidad
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener disponibilidad',
                error: error.message
            });
        }
    }
}
export default new DisponibilidadController();
