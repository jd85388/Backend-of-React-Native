import { Request, Response } from 'express';
import { ConsultaService } from '../services/consultas.service';

class CitaController {
    
    // Crear una nueva cita médica
    async crearCita(req: Request, res: Response): Promise<void> {
        try {
            const citaData = req.body;
            const nuevaCita = await ConsultaService.crearConsulta(citaData);
            
            res.status(201).json({
                success: true,
                message: 'Cita médica creada exitosamente',
                data: nuevaCita
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al crear cita médica',
                error: error.message
            });
        }
    }

    // Obtener todas las citas de un paciente
    async obtenerCitasPaciente(req: Request, res: Response): Promise<void> {
        try {
            const { id_paciente } = req.params;
            const citas = await ConsultaService.obtenerConsultasPorPaciente(id_paciente);
            
            res.status(200).json({
                success: true,
                message: 'Citas médicas obtenidas exitosamente',
                data: citas
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener citas médicas',
                error: error.message
            });
        }
    }

    // Obtener cita por ID
    async obtenerCitaPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const cita = await ConsultaService.obtenerConsultaPorId(id);
            
            if (!cita) {
                res.status(404).json({
                    success: false,
                    message: 'Cita médica no encontrada'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Cita médica obtenida exitosamente',
                data: cita
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener cita médica',
                error: error.message
            });
        }
    }

    // Actualizar cita médica
    async actualizarCita(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const datosActualizacion = req.body;
            
            const citaActualizada = await ConsultaService.actualizarConsulta(id, datosActualizacion);
            
            if (!citaActualizada) {
                res.status(404).json({
                    success: false,
                    message: 'Cita médica no encontrada'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Cita médica actualizada exitosamente',
                data: citaActualizada
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al actualizar cita médica',
                error: error.message
            });
        }
    }

    // Cancelar/Eliminar cita médica
    async cancelarCita(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const citaCancelada = await ConsultaService.eliminarConsulta(id);
            
            if (!citaCancelada) {
                res.status(404).json({
                    success: false,
                    message: 'Cita médica no encontrada'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Cita médica cancelada exitosamente'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al cancelar cita médica',
                error: error.message
            });
        }
    }

    // Obtener citas próximas (siguiente semana)
    async obtenerCitasProximas(req: Request, res: Response): Promise<void> {
        try {
            const { id_paciente } = req.params;
            const diasAdelante = parseInt(req.query.dias as string) || 7;
            
            const fechaActual = new Date();
            const fechaLimite = new Date();
            fechaLimite.setDate(fechaActual.getDate() + diasAdelante);
            
            const citasProximas = await ConsultaService.obtenerConsultasEnRango(
                id_paciente, 
                fechaActual, 
                fechaLimite
            );
            
            res.status(200).json({
                success: true,
                message: 'Citas próximas obtenidas exitosamente',
                data: citasProximas
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener citas próximas',
                error: error.message
            });
        }
    }

    // Obtener citas del día
    async obtenerCitasDelDia(req: Request, res: Response): Promise<void> {
        try {
            const { id_paciente } = req.params;
            const fecha = req.query.fecha ? new Date(req.query.fecha as string) : new Date();
            
            const inicioDelDia = new Date(fecha);
            inicioDelDia.setHours(0, 0, 0, 0);
            
            const finDelDia = new Date(fecha);
            finDelDia.setHours(23, 59, 59, 999);
            
            const citasDelDia = await ConsultaService.obtenerConsultasEnRango(
                id_paciente, 
                inicioDelDia, 
                finDelDia
            );
            
            res.status(200).json({
                success: true,
                message: 'Citas del día obtenidas exitosamente',
                data: citasDelDia
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener citas del día',
                error: error.message
            });
        }
    }

    // Obtener estadísticas de citas
    async obtenerEstadisticasCitas(req: Request, res: Response): Promise<void> {
        try {
            const { id_paciente } = req.params;
            const estadisticas = await ConsultaService.obtenerEstadisticasCitas(id_paciente);
            
            res.status(200).json({
                success: true,
                message: 'Estadísticas de citas obtenidas exitosamente',
                data: estadisticas
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener estadísticas de citas',
                error: error.message
            });
        }
    }
}

export default new CitaController();