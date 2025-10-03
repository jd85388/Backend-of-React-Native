import { crearPaciente } from '../services/paciente.service.js';
export const registrarPaciente = async (req, res) => {
    try {
        console.log('=== REGISTRO PACIENTE ===');
        console.log('Datos recibidos:', req.body);
        const paciente = await crearPaciente(req.body);
        console.log('Paciente creado exitosamente:', paciente);
        res.status(201).json(paciente);
    }
    catch (error) {
        console.error('Error en registro:', error);
        res.status(400).json({ message: error.message || 'Error al registrar paciente.' });
    }
};
