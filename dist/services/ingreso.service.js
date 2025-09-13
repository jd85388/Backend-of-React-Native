import jwt from "jsonwebtoken";
export const ingresoUsuario = async (usuario) => {
    const payload = { sub: usuario._id };
    const token = jwt.sign(payload, process.env.JWT_TOKEN, {
        expiresIn: "6h",
    });
    return {
        usuario: {
            id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
        },
        token,
    };
};
