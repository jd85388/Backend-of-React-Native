import * as MedicamentoService from "../services/RegistroMedicamento.service.js";
export const crearMedicamentoController = async (req, res) => {
    try {
        const idPaciente = req.idPaciente || (req.body && (req.body.id_Paciente || req.body.idPaciente));
        const data = req.body || {};
        if (!idPaciente) {
            return res.status(400).json({ message: 'El id del paciente (id_Paciente) es obligatorio. Usa la ruta /paciente/registroMedicamentoTest e incluye id_Paciente en el body para probar sin token.' });
        }
        if (!data.nombre || data.dosis == null || !data.frecuencia) {
            return res.status(400).json({ message: 'Faltan campos requeridos: nombre, dosis o frecuencia.' });
        }
        const medicamento = await MedicamentoService.crearMedicamento(String(idPaciente), data);
        res.status(201).json(medicamento);
    }
    catch (error) {
        console.error("Error al crear medicamento:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message, errors: error.errors });
        }
        res.status(500).json({ message: error.message || 'Error interno del servidor' });
    }
};
export const obtenerMedicamentosController = async (req, res) => {
    try {
        const idPaciente = req.idPaciente;
        const medicamentos = await MedicamentoService.obtenerMedicamentos(idPaciente);
        res.status(200).json(medicamentos);
    }
    catch (error) {
        console.error("Error al obtener medicamentos:", error);
        res.status(500).json({ message: error.message });
    }
};
export const actualizarEstadoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const medicamento = await MedicamentoService.actualizarEstadoMedicamento(id, estado);
        if (!medicamento) {
            return res.status(404).json({ message: "Medicamento no encontrado" });
        }
        res.status(200).json(medicamento);
    }
    catch (error) {
        console.error("Error al actualizar estado:", error);
        res.status(500).json({ message: error.message });
    }
};
export const eliminarMedicamentoController = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await MedicamentoService.eliminarMedicamento(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Medicamento no encontrado" });
        }
        res.status(200).json({ message: "Medicamento eliminado" });
    }
    catch (error) {
        console.error("Error al eliminar medicamento:", error);
        res.status(500).json({ message: error.message });
    }
};
