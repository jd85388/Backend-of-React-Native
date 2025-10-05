import Medicamento from "../models/medicamentos.js";
// Crear medicamento
export const crearMedicamento = async (idPaciente, data) => {
    const nuevoMedicamento = new Medicamento({
        id_Paciente: idPaciente,
        ...data,
        estado: true
    });
    return await nuevoMedicamento.save();
};
// Obtener todos los medicamentos del paciente
export const obtenerMedicamentos = async (idPaciente) => {
    return await Medicamento.find({ id_Paciente: idPaciente });
};
// Actualizar estado (activo/inactivo)
export const actualizarEstadoMedicamento = async (idMedicamento, estado) => {
    const medicamento = await Medicamento.findById(idMedicamento);
    if (!medicamento)
        return null;
    medicamento.estado = estado;
    return await medicamento.save();
};
// Eliminar medicamento
export const eliminarMedicamento = async (idMedicamento) => {
    const medicamento = await Medicamento.findById(idMedicamento);
    if (!medicamento)
        return null;
    return await medicamento.deleteOne();
};
