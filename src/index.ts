import express from 'express';
import { conectarBD } from './config/conexion.js'; 
import router from './routes/authRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_TOKEN) {
    console.log("hay un problema en el env no esta cargando las variables");
    process.exit(2);
}
const app = express();
app.use(express.json());
conectarBD();

app.use('/Views', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Conexion exitosa...`)
});