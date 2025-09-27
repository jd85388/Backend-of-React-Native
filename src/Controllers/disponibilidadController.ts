import { Request, Response } from 'express';
import DisponibilidadService from '../services/disponibilidad.service.js';

class DisponibilidadController {

    // Obtener todas las especialidades disponibles
    async obtenerEspecialidades(req: Request, res: Response): Promise<void> {
        try {
            const especialidades = await DisponibilidadService.obtenerEspecialidades();
            
            res.status(200).json({
                success: true,
                message: 'Especialidades obtenidas exitosamente',
                data: especialidades
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener especialidades',
                error: error.message
            });
        }
    }

    // Obtener médicos por especialidad
    async obtenerMedicosPorEspecialidad(req: Request, res: Response): Promise<void> {
        try {
            const { codigoEspecialidad } = req.params;
            const medicos = await DisponibilidadService.obtenerMedicosPorEspecialidad(codigoEspecialidad);
            
            res.status(200).json({
                success: true,
                message: 'Médicos obtenidos exitosamente',
                data: medicos
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener médicos',
                error: error.message
            });
        }
    }

    // Obtener horarios disponibles para una fecha
    async obtenerHorariosDisponibles(req: Request, res: Response): Promise<void> {
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

            const fechaSeleccionada = new Date(fecha as string);
            const horarios = await DisponibilidadService.obtenerHorariosDisponibles(disponibilidadId, fechaSeleccionada);
            
            res.status(200).json({
                success: true,
                message: 'Horarios disponibles obtenidos exitosamente',
                data: {
                    fecha: fechaSeleccionada,
                    horarios
                }
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener horarios disponibles',
                error: error.message
            });
        }
    }

    // Reservar una cita
    async reservarCita(req: Request, res: Response): Promise<void> {
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
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al reservar cita',
                error: error.message
            });
        }
    }

    // Obtener citas de un paciente
    async obtenerCitasPaciente(req: Request, res: Response): Promise<void> {
        try {
            const { pacienteId } = req.params;
            const citas = await DisponibilidadService.obtenerCitasPaciente(pacienteId);
            
            res.status(200).json({
                success: true,
                message: 'Citas del paciente obtenidas exitosamente',
                data: citas
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener citas del paciente',
                error: error.message
            });
        }
    }

    // Cancelar cita
    async cancelarCita(req: Request, res: Response): Promise<void> {
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
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al cancelar cita',
                error: error.message
            });
        }
    }

    // Reprogramar cita
    async reprogramarCita(req: Request, res: Response): Promise<void> {
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

            const citaReprogramada = await DisponibilidadService.reprogramarCita(
                citaId,
                new Date(nuevaFecha),
                nuevaHora
            );
            
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
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al reprogramar cita',
                error: error.message
            });
        }
    }

    // Obtener agenda de un médico
    async obtenerAgendaMedico(req: Request, res: Response): Promise<void> {
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

            const agenda = await DisponibilidadService.obtenerAgendaMedico(
                disponibilidadId,
                new Date(fecha as string)
            );
            
            res.status(200).json({
                success: true,
                message: 'Agenda del médico obtenida exitosamente',
                data: agenda
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener agenda del médico',
                error: error.message
            });
        }
    }

    // Poblar datos de ejemplo (solo para desarrollo)
    async poblarDatosEjemplo(req: Request, res: Response): Promise<void> {
        try {
            await DisponibilidadService.poblarDatosEjemplo();
            
            res.status(200).json({
                success: true,
                message: 'Datos de ejemplo poblados exitosamente'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al poblar datos de ejemplo',
                error: error.message
            });
        }
    }

    // Obtener información de disponibilidad específica
    async obtenerDisponibilidad(req: Request, res: Response): Promise<void> {
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
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener disponibilidad',
                error: error.message
            });
        }
    }
}

export default new DisponibilidadController();