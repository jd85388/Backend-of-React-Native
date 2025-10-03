import express from 'express';
import { conectarBD } from './config/conexion.js';
import router from './routes/authRoutes.js';
import cors from 'cors';
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// Middleware de logging para depuración
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});
conectarBD();
app.use('/Views', router);
// Ruta de prueba en la raíz
app.get('/', (req, res) => {
    res.json({ message: 'API Backend funcionando', status: 'OK' });
});
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Base de datos disponible para peticiones`);
});
