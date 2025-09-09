import express from 'express';
import { conectarBD } from './config/conexion.js'; 
import router from './routes/authRoutes.js';

const app = express();
app.use(express.json());
conectarBD();

app.use('/Views', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Conexion exitosa...`)
});