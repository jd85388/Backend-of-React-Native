import express from 'express';
import cors from 'cors';
import { conectarBD } from './config/conexion.js';
import router from './routes/authRoutes.js';
import epsRoutes from './routes/epsRoutes.js';
const app = express();
// Configurar CORS para permitir peticiones desde la aplicación móvil
app.use(cors({
    origin: '*', // En producción, especifica los dominios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
conectarBD();
// Rutas de autenticación
app.use('/Views', router);
// Rutas de la aplicación EPS (medicamentos y citas)
app.use('/api', epsRoutes);
// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Backend Life Reminder EPS - Funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            auth: '/Views',
            eps: '/api',
            test: '/api/test'
        }
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Life Reminder EPS ejecutándose en puerto ${PORT}`);
    console.log(`📱 Endpoints disponibles:`);
    console.log(`   - Autenticación: http://localhost:${PORT}/Views`);
    console.log(`   - API EPS: http://localhost:${PORT}/api`);
    console.log(`   - Test: http://localhost:${PORT}/api/test`);
});
//# sourceMappingURL=index.js.map