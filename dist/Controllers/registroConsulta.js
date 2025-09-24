import { ConsultaService } from "../services/consultas.service";
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
