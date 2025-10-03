import { Router } from 'express';
import { registrarPaciente } from '../Controllers/registro.js';
import { registrarMedicamento } from '../Controllers/registroMedicamento.js';
import { registrarConsulta } from '../Controllers/registroConsulta.js';
import { loginController } from '../Controllers/ingreso.js';
import { verificacionPassword } from '../middleware/validacion.js';
const router = Router();
// Ruta de prueba para verificar conectividad
router.get('/test', (req, res) => {
    res.json({ message: 'Backend funcionando correctamente', timestamp: new Date() });
});
router.post('/registrar', registrarPaciente);
router.post('/paciente/medicamento', registrarMedicamento);
router.post('/paciente/consulta', registrarConsulta);
router.post('/ingreso', verificacionPassword, loginController);
export default router;
