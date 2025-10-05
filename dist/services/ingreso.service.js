import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_ALGORITHM = "HS256";
if (!ACCESS_TOKEN_SECRET) {
    throw new Error("Falta la variable de entorno JWT_SECRET");
}
export const ingresoUsuario = async (usuario) => {
    const safeUsuario = {
        id: String(usuario._id),
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        numero: usuario.numero,
        documento: usuario.documento,
        fechaNacimiento: usuario.fechaNacimiento,
    };
    const payload = {
        sub: String(usuario._id),
        id: String(usuario._id),
        _id: String(usuario._id),
        email: usuario.email,
    };
    try {
        const options = {
            algorithm: ACCESS_TOKEN_ALGORITHM,
        };
        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, options);
        return {
            usuario: safeUsuario,
            accessToken,
        };
    }
    catch (err) {
        console.error("ingresoUsuario jwt.sign error:", (err && err.message) || err);
        throw new Error("Error al generar access token");
    }
};
