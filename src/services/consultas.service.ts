import Consulta from "../models/consultas.js";

export const CrearConsulta = async (datos: {
    id_Paciente: string;
    especialidad: string;  
    doctor: string;
    fecha: Date;
    motivo: string;
    estado: boolean;
    direccion: string;
    observacion?: string;
    recordatorio: boolean;
    prioridad: 'baja' | 'media' | 'alta';
}) => { 
    const { id_Paciente, especialidad, doctor, fecha, motivo, estado, direccion, observacion, recordatorio, prioridad } = datos;
    if (!id_Paciente || !especialidad?.trim() || !doctor?.trim() || !fecha || !motivo?.trim() || !direccion?.trim() || !prioridad) {
    throw new Error('No has completado todos los campos requeridos, porfavor completa los campos faltantes');
}
 try {
    const nuevaConsulta = new Consulta({
        especialidad,
        doctor, 
        fecha,
        motivo,
        estado,
        direccion,
        observacion,
        recordatorio,
        prioridad,
        id_Paciente
    });

    const guardar = await nuevaConsulta.save();
    return guardar;
} catch (error: any) {
    if (error.name === 'ValidationError') {
        const mensajes = Object.values(error.errors).map((e: any) => e.message);
        throw new Error(mensajes.join(','))
    }
    throw new Error('Tuvimos un error al registrar la consulta, vuelve a intentarlo');
}
 };