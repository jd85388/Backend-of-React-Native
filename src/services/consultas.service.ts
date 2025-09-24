import Consulta, { Iconsulta } from "../models/consultas";

export class ConsultaService {

    static async crearConsulta(consultaData: any): Promise<Iconsulta> {
        const { id_Paciente, especialidad, doctor, fecha, motivo, direccion, prioridad } = consultaData;
        
        if (!id_Paciente || !especialidad?.trim() || !doctor?.trim() || !fecha || !motivo?.trim() || !direccion?.trim() || !prioridad) {
            throw new Error('Todos los campos obligatorios deben ser completados');
        }

        const nuevaConsulta = new Consulta(consultaData);
        return await nuevaConsulta.save();
    }

    static async obtenerConsultas(): Promise<Iconsulta[]> {
        return await Consulta.find().populate('id_Paciente', 'nombre apellido email');
    }

    static async obtenerConsultaPorId(id: string): Promise<Iconsulta | null> {
        return await Consulta.findById(id).populate('id_Paciente', 'nombre apellido email');
    }

    static async actualizarConsulta(id: string, consultaData: Partial<Iconsulta>): Promise<Iconsulta | null> {
        return await Consulta.findByIdAndUpdate(id, consultaData, { new: true });
    }

    static async eliminarConsulta(id: string): Promise<Iconsulta | null> {
        return await Consulta.findByIdAndDelete(id);
    }

    static async obtenerConsultasPorPaciente(idPaciente: string): Promise<Iconsulta[]> {
        return await Consulta.find({ id_Paciente: idPaciente })
            .populate('id_Paciente', 'nombre apellido email')
            .sort({ fecha: 1 });
    }

    // Nuevos métodos para la aplicación EPS
    static async obtenerConsultasEnRango(idPaciente: string, fechaInicio: Date, fechaFin: Date): Promise<Iconsulta[]> {
        return await Consulta.find({
            id_Paciente: idPaciente,
            fecha: {
                $gte: fechaInicio,
                $lte: fechaFin
            }
        }).populate('id_Paciente', 'nombre apellido email').sort({ fecha: 1 });
    }

    static async obtenerConsultasProximas(idPaciente: string, dias: number = 7): Promise<Iconsulta[]> {
        const fechaActual = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaActual.getDate() + dias);

        return await Consulta.find({
            id_Paciente: idPaciente,
            fecha: {
                $gte: fechaActual,
                $lte: fechaLimite
            },
            estado: true
        }).populate('id_Paciente', 'nombre apellido email').sort({ fecha: 1 });
    }

    static async obtenerConsultasPasadas(idPaciente: string): Promise<Iconsulta[]> {
        const fechaActual = new Date();
        return await Consulta.find({
            id_Paciente: idPaciente,
            fecha: { $lt: fechaActual }
        }).populate('id_Paciente', 'nombre apellido email').sort({ fecha: -1 });
    }

    static async obtenerConsultasPorEspecialidad(idPaciente: string, especialidad: string): Promise<Iconsulta[]> {
        return await Consulta.find({
            id_Paciente: idPaciente,
            especialidad: { $regex: especialidad, $options: 'i' }
        }).populate('id_Paciente', 'nombre apellido email').sort({ fecha: -1 });
    }

    static async obtenerConsultasPorPrioridad(idPaciente: string, prioridad: 'baja' | 'media' | 'alta'): Promise<Iconsulta[]> {
        return await Consulta.find({
            id_Paciente: idPaciente,
            prioridad
        }).populate('id_Paciente', 'nombre apellido email').sort({ fecha: 1 });
    }

    static async cambiarEstadoConsulta(id: string, estado: boolean): Promise<Iconsulta | null> {
        return await Consulta.findByIdAndUpdate(
            id, 
            { estado }, 
            { new: true }
        );
    }

    static async obtenerEstadisticasCitas(idPaciente: string): Promise<any> {
        const fechaActual = new Date();
        
        const total = await Consulta.countDocuments({ id_Paciente: idPaciente });
        const programadas = await Consulta.countDocuments({ 
            id_Paciente: idPaciente, 
            fecha: { $gte: fechaActual },
            estado: true
        });
        const realizadas = await Consulta.countDocuments({ 
            id_Paciente: idPaciente,
            fecha: { $lt: fechaActual }
        });
        const canceladas = await Consulta.countDocuments({ 
            id_Paciente: idPaciente,
            estado: false
        });

        // Próximas 7 días
        const fechaProxima = new Date();
        fechaProxima.setDate(fechaActual.getDate() + 7);
        const proximasSemana = await Consulta.countDocuments({
            id_Paciente: idPaciente,
            fecha: { 
                $gte: fechaActual,
                $lte: fechaProxima
            },
            estado: true
        });

        return {
            total,
            programadas,
            realizadas,
            canceladas,
            proximasSemana
        };
    }

    static async obtenerConsultasConRecordatorio(idPaciente: string): Promise<Iconsulta[]> {
        return await Consulta.find({
            id_Paciente: idPaciente,
            recordatorio: true,
            estado: true,
            fecha: { $gte: new Date() }
        }).populate('id_Paciente', 'nombre apellido email').sort({ fecha: 1 });
    }
}