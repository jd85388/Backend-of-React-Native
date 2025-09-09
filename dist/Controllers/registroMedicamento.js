import { crearMedicamento } from "../services/medicamento.service.js";
export const registrarMedicamento = async (req, res) => {
    try {
        const medicamento = await crearMedicamento(req.body);
        res.status(201).json(medicamento);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Error al registrar medicamento.' });
    }
};
