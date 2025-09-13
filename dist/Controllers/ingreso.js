import jwt from "jsonwebtoken";
import Paciente from "../models/paciente.js";
import { ingresoUsuario } from "../services/ingreso.service.js";
export const loginController = async (req, res) => {
    try {
        const usuario = req.usuario;
        const { usuario: dataUsuario, token: accessToken } = await ingresoUsuario(usuario);
        const refreshToken = jwt.sign({ sub: usuario._id }, process.env.JWT_TOKEN, { expiresIn: "7d" });
        await Paciente.findByIdAndUpdate(usuario._id, { refreshToken });
        res.status(200).json({
            usuario: dataUsuario,
            accessToken,
            refreshToken,
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message || "Tenemos probelams para procesar su solicitud" });
    }
};
