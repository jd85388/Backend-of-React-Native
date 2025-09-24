import { Router } from 'express';
import MedicamentoController from '../Controllers/medicamentoController';
import CitaController from '../Controllers/citaController';
const router = Router();
// === RUTAS DE MEDICAMENTOS ===
// Crear un nuevo medicamento
router.post('/medicamentos', MedicamentoController.crearMedicamento);
// Obtener medicamentos por paciente
router.get('/medicamentos/paciente/:id_paciente', MedicamentoController.obtenerMedicamentosPaciente);
// Obtener medicamento por ID
router.get('/medicamentos/:id', MedicamentoController.obtenerMedicamentoPorId);
// Actualizar medicamento
router.put('/medicamentos/:id', MedicamentoController.actualizarMedicamento);
// Eliminar medicamento
router.delete('/medicamentos/:id', MedicamentoController.eliminarMedicamento);
// Obtener medicamentos activos de un paciente
router.get('/medicamentos/activos/:id_paciente', MedicamentoController.obtenerMedicamentosActivos);
// Obtener recordatorios del día
router.get('/medicamentos/recordatorios/:id_paciente', MedicamentoController.obtenerRecordatoriosDelDia);
// === RUTAS DE CITAS MÉDICAS ===
// Crear una nueva cita
router.post('/citas', CitaController.crearCita);
// Obtener citas por paciente  
router.get('/citas/paciente/:id_paciente', CitaController.obtenerCitasPaciente);
// Obtener cita por ID
router.get('/citas/:id', CitaController.obtenerCitaPorId);
// Actualizar cita
router.put('/citas/:id', CitaController.actualizarCita);
// Cancelar/Eliminar cita
router.delete('/citas/:id', CitaController.cancelarCita);
// Obtener citas próximas
router.get('/citas/proximas/:id_paciente', CitaController.obtenerCitasProximas);
// Obtener citas del día
router.get('/citas/dia/:id_paciente', CitaController.obtenerCitasDelDia);
// Obtener estadísticas de citas
router.get('/citas/estadisticas/:id_paciente', CitaController.obtenerEstadisticasCitas);
// === RUTAS ADICIONALES ===
// Ruta de prueba
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'API EPS funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});
export default router;
//# sourceMappingURL=epsRoutes.js.map