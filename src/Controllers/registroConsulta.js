import { ConsultaService } from "../services/consultas.service.js";
import { Request, Response } from "express";
export const registrarConsulta = async (req, res) => {
    try {
        const consulta = await ConsultaService.crearConsulta(req.body);
        res.status(201).json(consulta);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Error al registrar consulta.' });
    }
};
//# sourceMappingURL=registroConsulta.js.map