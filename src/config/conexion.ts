import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO as string);
        console.log("Base de datos Disponible para peticiones");
    } catch (error) {
        console.log("Error de conexion con la base de datos: ", error);
        process.exit(1);
    }
};

