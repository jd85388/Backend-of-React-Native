import Consulta from '../models/consultas.js';
// Crear nueva consulta
export const crearConsulta = async (req, res) => {
    try {
        const idPaciente = req.idPaciente;
        if (!idPaciente) {
            res.status(401).json({ mensaje: 'Usuario no autenticado' });
            return;
        }
        const consultaData = {
            ...req.body,
            id_Paciente: idPaciente
        };
        const nuevaConsulta = new Consulta(consultaData);
        const consultaGuardada = await nuevaConsulta.save();
        res.status(201).json({
            mensaje: 'Consulta creada exitosamente',
            consulta: consultaGuardada
        });
    }
    catch (error) {
        console.error('Error al crear consulta:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Obtener todas las consultas del usuario
export const obtenerConsultas = async (req, res) => {
    try {
        const idPaciente = req.idPaciente;
        if (!idPaciente) {
            res.status(401).json({ mensaje: 'Usuario no autenticado' });
            return;
        }
        const consultas = await Consulta.find({ id_Paciente: idPaciente }).sort({ fecha: 1 });
        res.status(200).json({
            mensaje: 'Consultas obtenidas exitosamente',
            consultas
        });
    }
    catch (error) {
        console.error('Error al obtener consultas:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Obtener consultas próximas (futuras)
export const obtenerConsultasProximas = async (req, res) => {
    try {
        const idPaciente = req.idPaciente;
        if (!idPaciente) {
            res.status(401).json({ mensaje: 'Usuario no autenticado' });
            return;
        }
        const fechaActual = new Date();
        const consultas = await Consulta.find({
            id_Paciente: idPaciente,
            fecha: { $gte: fechaActual },
            estado: true
        }).sort({ fecha: 1 });
        res.status(200).json({
            mensaje: 'Consultas próximas obtenidas exitosamente',
            consultas
        });
    }
    catch (error) {
        console.error('Error al obtener consultas próximas:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Obtener historial de consultas (pasadas)
export const obtenerHistorialConsultas = async (req, res) => {
    try {
        const idPaciente = req.idPaciente;
        if (!idPaciente) {
            res.status(401).json({ mensaje: 'Usuario no autenticado' });
            return;
        }
        const fechaActual = new Date();
        const consultas = await Consulta.find({
            id_Paciente: idPaciente,
            fecha: { $lt: fechaActual }
        }).sort({ fecha: -1 });
        res.status(200).json({
            mensaje: 'Historial de consultas obtenido exitosamente',
            consultas
        });
    }
    catch (error) {
        console.error('Error al obtener historial de consultas:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Obtener consulta por ID
export const obtenerConsultaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const idPaciente = req.idPaciente;
        if (!idPaciente) {
            res.status(401).json({ mensaje: 'Usuario no autenticado' });
            return;
        }
        const consulta = await Consulta.findOne({ _id: id, id_Paciente: idPaciente });
        if (!consulta) {
            res.status(404).json({ mensaje: 'Consulta no encontrada' });
            return;
        }
        res.status(200).json({
            mensaje: 'Consulta obtenida exitosamente',
            consulta
        });
    }
    catch (error) {
        console.error('Error al obtener consulta:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Actualizar consulta
export const actualizarConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        const idPaciente = req.idPaciente;
        if (!idPaciente) {
            res.status(401).json({ mensaje: 'Usuario no autenticado' });
            return;
        }
        const consultaActualizada = await Consulta.findOneAndUpdate({ _id: id, id_Paciente: idPaciente }, { ...req.body }, { new: true, runValidators: true });
        if (!consultaActualizada) {
            res.status(404).json({ mensaje: 'Consulta no encontrada' });
            return;
        }
        res.status(200).json({
            mensaje: 'Consulta actualizada exitosamente',
            consulta: consultaActualizada
        });
    }
    catch (error) {
        console.error('Error al actualizar consulta:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Eliminar consulta
export const eliminarConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        const idPaciente = req.idPaciente;
        if (!idPaciente) {
            res.status(401).json({ mensaje: 'Usuario no autenticado' });
            return;
        }
        const consultaEliminada = await Consulta.findOneAndDelete({ _id: id, id_Paciente: idPaciente });
        if (!consultaEliminada) {
            res.status(404).json({ mensaje: 'Consulta no encontrada' });
            return;
        }
        res.status(200).json({
            mensaje: 'Consulta eliminada exitosamente',
            consulta: consultaEliminada
        });
    }
    catch (error) {
        console.error('Error al eliminar consulta:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Cancelar consulta (cambiar estado a false)
export const cancelarConsulta = async (req, res) => {
    try {
        const { id } = req.params;
        const idPaciente = req.idPaciente;
        if (!idPaciente) {
            res.status(401).json({ mensaje: 'Usuario no autenticado' });
            return;
        }
        const consultaCancelada = await Consulta.findOneAndUpdate({ _id: id, id_Paciente: idPaciente }, { estado: false }, { new: true });
        if (!consultaCancelada) {
            res.status(404).json({ mensaje: 'Consulta no encontrada' });
            return;
        }
        res.status(200).json({
            mensaje: 'Consulta cancelada exitosamente',
            consulta: consultaCancelada
        });
    }
    catch (error) {
        console.error('Error al cancelar consulta:', error);
        res.status(500).json({
            mensaje: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
