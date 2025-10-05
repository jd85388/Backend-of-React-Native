import express from 'express';
import { conectarBD } from './config/conexion.js'; 
import router from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

// Cargar variables de entorno
dotenv.config();

// Validar variables de entorno críticas
if (!process.env.MONGO) {
    console.error('❌ Error: MONGO connection string is required');
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error('❌ Error: JWT_SECRET is required');
    process.exit(1);
}

export const resend = new Resend(process.env.RESEND);

const app = express();

// Configuración de CORS más específica para producción
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-frontend-domain.com', 'exp://'] // Ajustar según tu dominio
        : true,
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ruta de health check para Render
app.get('/', (req, res) => {
    res.json({
        message: 'Life Reminder API is running! 🚀',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Conectar a la base de datos
conectarBD();

// Rutas de la API
app.use('/Views', router);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Manejo global de errores
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('💥 Unhandled error:', error);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : error.message
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Life Reminder API running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/`);
});