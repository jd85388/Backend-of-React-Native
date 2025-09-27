import Medicamento, { IMedicamentos } from '../models/medicamentos.js';

export class MedicamentoService {

    static async crearMedicamento(medicamentoData: any): Promise<IMedicamentos> {
        // Validación de campos requeridos
        const { nombre, dosis, unidad, frecuencia, viaAdministracion, duracion, recetadoPor, descripcion, causaUso, id_Paciente } = medicamentoData;
        
        if (!nombre?.trim() || !dosis || !unidad?.trim() || !frecuencia?.trim() || !viaAdministracion?.trim() || !recetadoPor?.trim() || !descripcion?.trim() || !causaUso?.trim() || !id_Paciente?.trim() || !duracion?.inicio || !duracion?.fin) {
            throw new Error('Todos los campos obligatorios deben ser completados');
        }

        const nuevoMedicamento = new Medicamento(medicamentoData);
        return await nuevoMedicamento.save();
    }

    static async obtenerMedicamentos(): Promise<IMedicamentos[]> {
        return await Medicamento.find().populate('id_Paciente', 'nombre apellido email');
    }

    static async obtenerMedicamentoPorId(id: string): Promise<IMedicamentos | null> {
        return await Medicamento.findById(id).populate('id_Paciente', 'nombre apellido email');
    }

    static async actualizarMedicamento(id: string, medicamentoData: Partial<IMedicamentos>): Promise<IMedicamentos | null> {
        return await Medicamento.findByIdAndUpdate(id, medicamentoData, { new: true });
    }

    static async eliminarMedicamento(id: string): Promise<IMedicamentos | null> {
        return await Medicamento.findByIdAndDelete(id);
    }

    static async obtenerMedicamentosPorPaciente(idPaciente: string): Promise<IMedicamentos[]> {
        return await Medicamento.find({ id_Paciente: idPaciente }).populate('id_Paciente', 'nombre apellido email');
    }

    // Nuevos métodos para la aplicación EPS
    static async obtenerMedicamentosActivos(idPaciente: string): Promise<IMedicamentos[]> {
        const fechaActual = new Date();
        return await Medicamento.find({ 
            id_Paciente: idPaciente,
            estado: true,
            'duracion.fin': { $gte: fechaActual }
        }).populate('id_Paciente', 'nombre apellido email');
    }

    static async obtenerMedicamentosVencidos(idPaciente: string): Promise<IMedicamentos[]> {
        const fechaActual = new Date();
        return await Medicamento.find({ 
            id_Paciente: idPaciente,
            'duracion.fin': { $lt: fechaActual }
        }).populate('id_Paciente', 'nombre apellido email');
    }

    static async obtenerMedicamentosPorVencer(idPaciente: string, dias: number = 3): Promise<IMedicamentos[]> {
        const fechaActual = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaActual.getDate() + dias);
        
        return await Medicamento.find({ 
            id_Paciente: idPaciente,
            estado: true,
            'duracion.fin': { 
                $gte: fechaActual,
                $lte: fechaLimite 
            }
        }).populate('id_Paciente', 'nombre apellido email');
    }

    static async obtenerRecordatoriosDelDia(idPaciente: string, fecha: Date): Promise<IMedicamentos[]> {
        const inicioDelDia = new Date(fecha);
        inicioDelDia.setHours(0, 0, 0, 0);
        
        const finDelDia = new Date(fecha);
        finDelDia.setHours(23, 59, 59, 999);
        
        return await Medicamento.find({ 
            id_Paciente: idPaciente,
            estado: true,
            'duracion.inicio': { $lte: finDelDia },
            'duracion.fin': { $gte: inicioDelDia }
        }).populate('id_Paciente', 'nombre apellido email');
    }

    static async cambiarEstadoMedicamento(id: string, estado: boolean): Promise<IMedicamentos | null> {
        return await Medicamento.findByIdAndUpdate(
            id, 
            { estado }, 
            { new: true }
        );
    }

    static async obtenerEstadisticasMedicamentos(idPaciente: string): Promise<any> {
        const total = await Medicamento.countDocuments({ id_Paciente: idPaciente });
        const activos = await Medicamento.countDocuments({ 
            id_Paciente: idPaciente, 
            estado: true,
            'duracion.fin': { $gte: new Date() }
        });
        const vencidos = await Medicamento.countDocuments({ 
            id_Paciente: idPaciente,
            'duracion.fin': { $lt: new Date() }
        });
        const porVencer = await MedicamentoService.obtenerMedicamentosPorVencer(idPaciente);

        return {
            total,
            activos,
            vencidos,
            porVencer: porVencer.length
        };
    }
}