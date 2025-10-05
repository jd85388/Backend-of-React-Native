import jwt from 'jsonwebtoken';
import Paciente from '../models/paciente.js';
export const authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header)
            return res.status(401).json({ message: 'No token provided' });
        const token = header.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const idFromToken = payload?.id || payload?._id || payload?.userId || payload?.sub;
        if (idFromToken) {
            req.idPaciente = String(idFromToken);
            return next();
        }
        const emailFromToken = payload?.email || payload?.correo || payload?.username;
        if (emailFromToken) {
            try {
                const paciente = await Paciente.findOne({ email: String(emailFromToken).toLowerCase() }).select('_id');
                if (paciente && paciente._id) {
                    req.idPaciente = String(paciente._id);
                    return next();
                }
            }
            catch (dbErr) {
                console.error('authMiddleware DB lookup error:', dbErr);
                return res.status(500).json({ message: 'Error al verificar token' });
            }
        }
        return res.status(401).json({ message: 'Token válido pero sin id de usuario' });
    }
    catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
