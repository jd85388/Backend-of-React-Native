import { crearMedicamento } from "../services/medicamento.service.js";
import { Request, Response } from "express";

export const registrarMedicamento = async (req: Request, res: Response) => {
    try {
        const medicamento = await crearMedicamento(req.body);
        res.status(201).json(medicamento);
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Error al registrar medicamento.' });
    }
}