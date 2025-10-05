import express from 'express';
import { conectarBD } from './config/conexion.js';
import router from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
dotenv.config();
export const resend = new Resend(process.env.RESEND);
const app = express();
app.use(cors());
app.use(express.json());
conectarBD();
app.use('/Views', router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Conexion exitosa...`);
});
