import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const conectarBD = async () => {
    try {
        console.log("MONGO URI:", process.env.MONGO); // Debug
        const mongoUri = process.env.MONGO;
        if (!mongoUri) {
            throw new Error("La variable de entorno MONGO no está definida");
        }
        await mongoose.connect(mongoUri);
        console.log("Base de datos Disponible para peticiones");
    }
    catch (error) {
        console.log("Error de conexion con la base de datos: ", error);
        process.exit(1);
    }
};
//# sourceMappingURL=conexion.js.map