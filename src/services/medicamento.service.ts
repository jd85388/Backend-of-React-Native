import Medicamento from '../models/medicamentos.js';

export const crearMedicamento = async (datos: {
    nombre: string;
    dosis: number;
    unidad: string;
    frecuencia: string;
    viaAdministracion: string;
    duracion: { inicio: Date; fin: Date};
    recetadoPor: string;
    descripcion: string;
    notas?: string;
    causaUso: string;
    id_paciente: string;
}) => {
    const { nombre, dosis, unidad, frecuencia, viaAdministracion, duracion, recetadoPor, descripcion, notas, causaUso, id_paciente } = datos;
    
    if(!nombre?.trim() || !dosis || !unidad?.trim() || !frecuencia?.trim() || !viaAdministracion?.trim() || !recetadoPor?.trim() || !descripcion?.trim() || !causaUso?.trim() || !id_paciente?.trim() || !duracion?.inicio || !duracion?.fin || typeof dosis !== 'number'){ 
        throw new Error('Tienes campos faltantes, porfavor completa todos los campos, son requeridos');
    }
    try {
    const nuevoMedicamento = new Medicamento({
        nombre,
        dosis,
        unidad,
        frecuencia,
        viaAdministracion,
        duracion,
        recetadoPor,
        descripcion,
        notas,
        causaUso,
        id_paciente
    });
    const guardar = await nuevoMedicamento.save();
    return guardar;
} catch (error: any) {
    if (error.name === 'validationError') {
        const mensajes = Object.values(error.errors).map((e: any) => e.message);
        throw new Error(mensajes.join(','));
    }
    throw new Error('Error al registrar el medicamento');
}
};

   