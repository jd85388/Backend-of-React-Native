import { Request, Response } from 'express';
import { MedicamentoService } from '../services/medicamento.service';

class MedicamentoController {
    
    // Crear un nuevo medicamento
    async crearMedicamento(req: Request, res: Response): Promise<void> {
        try {
            const medicamentoData = req.body;
            const nuevoMedicamento = await MedicamentoService.crearMedicamento(medicamentoData);
            
            res.status(201).json({
                success: true,
                message: 'Medicamento creado exitosamente',
                data: nuevoMedicamento
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al crear medicamento',
                error: error.message
            });
        }
    }

    // Obtener todos los medicamentos de un paciente
    async obtenerMedicamentosPaciente(req: Request, res: Response): Promise<void> {
        try {
            const { id_paciente } = req.params;
            const medicamentos = await MedicamentoService.obtenerMedicamentosPorPaciente(id_paciente);
            
            res.status(200).json({
                success: true,
                message: 'Medicamentos obtenidos exitosamente',
                data: medicamentos
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener medicamentos',
                error: error.message
            });
        }
    }

    // Obtener medicamento por ID
    async obtenerMedicamentoPorId(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const medicamento = await MedicamentoService.obtenerMedicamentoPorId(id);
            
            if (!medicamento) {
                res.status(404).json({
                    success: false,
                    message: 'Medicamento no encontrado'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Medicamento obtenido exitosamente',
                data: medicamento
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener medicamento',
                error: error.message
            });
        }
    }

    // Actualizar medicamento
    async actualizarMedicamento(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const datosActualizacion = req.body;
            
            const medicamentoActualizado = await MedicamentoService.actualizarMedicamento(id, datosActualizacion);
            
            if (!medicamentoActualizado) {
                res.status(404).json({
                    success: false,
                    message: 'Medicamento no encontrado'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Medicamento actualizado exitosamente',
                data: medicamentoActualizado
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al actualizar medicamento',
                error: error.message
            });
        }
    }

    // Eliminar medicamento
    async eliminarMedicamento(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const medicamentoEliminado = await MedicamentoService.eliminarMedicamento(id);
            
            if (!medicamentoEliminado) {
                res.status(404).json({
                    success: false,
                    message: 'Medicamento no encontrado'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Medicamento eliminado exitosamente'
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al eliminar medicamento',
                error: error.message
            });
        }
    }

    // Obtener medicamentos activos (no vencidos)
    async obtenerMedicamentosActivos(req: Request, res: Response): Promise<void> {
        try {
            const { id_paciente } = req.params;
            const medicamentosActivos = await MedicamentoService.obtenerMedicamentosActivos(id_paciente);
            
            res.status(200).json({
                success: true,
                message: 'Medicamentos activos obtenidos exitosamente',
                data: medicamentosActivos
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener medicamentos activos',
                error: error.message
            });
        }
    }

    // Obtener recordatorios del día
    async obtenerRecordatoriosDelDia(req: Request, res: Response): Promise<void> {
        try {
            const { id_paciente } = req.params;
            const fecha = req.query.fecha ? new Date(req.query.fecha as string) : new Date();
            
            const recordatorios = await MedicamentoService.obtenerRecordatoriosDelDia(id_paciente, fecha);
            
            res.status(200).json({
                success: true,
                message: 'Recordatorios del día obtenidos exitosamente',
                data: recordatorios
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Error al obtener recordatorios',
                error: error.message
            });
        }
    }
}

export default new MedicamentoController();