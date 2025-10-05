import { Datos } from "../services/actualizarDatos.service.js";
export const actualizarDatosPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, numero } = req.body;
        const pacienteActualizado = await Datos(id, {
            nombre,
            apellido,
            email,
            numero,
        });
        res.json({
            message: "Datos actualizados correctamente",
            paciente: pacienteActualizado,
        });
    }
    catch (err) {
        console.error("Error al actualizar datos:", err.message || err);
        res.status(400).json({
            message: "Tuvimos problema para actualizar los datos, intentalo de nuevo más tarde",
            error: err.message || err,
        });
    }
};
