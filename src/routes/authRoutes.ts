import { Router } from 'express';
import { registrarPaciente } from '../Controllers/registro.js';
import { registrarMedicamento } from '../Controllers/registroMedicamento.js';
import { registrarConsulta } from '../Controllers/registroConsulta.js';

const router = Router();


router.post('/registrar', registrarPaciente);
router.post('/paciente/medicamento', registrarMedicamento);
router.post('/paciente/consulta', registrarConsulta);
 
export default router;