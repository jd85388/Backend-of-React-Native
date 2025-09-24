import { Request, Response } from 'express';
import { crearPaciente } from '../services/paciente.service.js';
export const registrarPaciente = async (req, res) => {
    try {
        const paciente = await crearPaciente(req.body);
        res.status(201).json(paciente);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message || 'Error al registrar paciente.' });
    }
};
//# sourceMappingURL=registro.js.map