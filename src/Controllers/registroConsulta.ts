import { CrearConsulta } from "../services/consultas.service.js"
import { Request, Response } from "express";

export const registrarConsulta = async (req: Request, res: Response) => {
    try {
         const consulta = await CrearConsulta(req.body);
         res.status(201).json(consulta);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Error al registrar consulta.' });
} 
};
