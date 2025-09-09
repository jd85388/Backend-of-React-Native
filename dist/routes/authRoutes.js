import { Router } from 'express';
import { registrarPaciente } from '../Controllers/registro.js';
import { registrarMedicamento } from '../Controllers/registroMedicamento.js';
const router = Router();
router.post('/registrar', registrarPaciente);
router.post('/medicamento', registrarMedicamento);
export default router;
