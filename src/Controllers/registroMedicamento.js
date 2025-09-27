import { MedicamentoService } from "../services/medicamento.service.js";
import { Request, Response } from "express";
export const registrarMedicamento = async (req, res) => {
    try {
        const medicamento = await MedicamentoService.crearMedicamento(req.body);
        res.status(201).json(medicamento);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Error al registrar medicamento.' });
    }
};
//# sourceMappingURL=registroMedicamento.js.map