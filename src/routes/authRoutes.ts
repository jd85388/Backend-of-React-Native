import { Router } from 'express';
import { registrarPaciente } from '../Controllers/registro.js';

const router = Router();


router.post('/registrar', registrarPaciente);
 
export default router;