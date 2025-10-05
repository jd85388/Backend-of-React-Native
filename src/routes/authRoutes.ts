import { Router } from 'express';
import { registrarPaciente } from '../Controllers/registro.js';
import { registrarConsulta } from '../Controllers/registroConsulta.js';
import { 
  crearConsulta, 
  obtenerConsultas, 
  obtenerConsultasProximas, 
  obtenerHistorialConsultas,
  obtenerConsultaPorId,
  actualizarConsulta,
  eliminarConsulta,
  cancelarConsulta 
} from '../Controllers/consultaCrud.js';
import { loginController } from '../Controllers/ingreso.js';
import { verificacionPassword } from '../middleware/validacion.js';
import { actualizarDatosPerfil } from '../Controllers/actualizarDatos.js';
import { contactarSoporte } from '../Controllers/contactarSoporte.js';
import { crearMedicamentoController, eliminarMedicamentoController, obtenerMedicamentosController, actualizarEstadoController } from '../Controllers/registroMedicamento.js';
import { authMiddleware } from '../middleware/validacionMedicametno.js';

const router = Router();


router.post('/registrar', registrarPaciente);
router.post('/ingreso', verificacionPassword, loginController)
// Rutas de consultas
router.post('/paciente/consulta', crearConsulta);
router.get('/paciente/consultas', obtenerConsultas);
router.get('/paciente/consultas/proximas', obtenerConsultasProximas);
router.get('/paciente/consultas/historial', obtenerHistorialConsultas);
router.get('/paciente/consulta/:id', obtenerConsultaPorId);
router.patch('/paciente/consulta/:id', actualizarConsulta);
router.delete('/paciente/consulta/:id', eliminarConsulta);
router.patch('/paciente/consulta/:id/cancelar', cancelarConsulta);

// Ruta legacy (mantener compatibilidad)
router.post('/paciente/consulta-legacy', registrarConsulta);
router.put('/paciente/actualizarDatosPerfil/:id', actualizarDatosPerfil);
router.post('/paciente/contactaSoporte', contactarSoporte);
router.post("/paciente/registroMedicamento", authMiddleware, crearMedicamentoController);
router.post("/paciente/registroMedicamentoTest", crearMedicamentoController);
router.get("/paciente/obtenerMedicamento", authMiddleware, obtenerMedicamentosController);
router.patch("/paciente/estadoMedicamento/:id", authMiddleware, actualizarEstadoController);
router.delete("/paciente/eliminarMedicamento/:id", authMiddleware, eliminarMedicamentoController);

export default router;