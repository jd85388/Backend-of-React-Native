import jwt from 'jsonwebtoken';
import Paciente from '../models/paciente.js';
export const authMiddleware = async (req, res, next) => {
    console.log('🔥 MIDDLEWARE EJECUTADO - Ruta:', req.method, req.path);
    try {
        const header = req.headers.authorization;
        console.log('🔥 Header Authorization:', header ? 'PRESENTE' : 'AUSENTE');
        if (!header)
            return res.status(401).json({ message: 'No token provided' });
        const token = header.split(' ')[1];
        console.log('Token recibido (primeros 50 chars):', token.substring(0, 50) + '...');
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log('=== DEBUGGING TOKEN ===');
        console.log('Token payload completo:', JSON.stringify(payload, null, 2));
        console.log('payload.id:', payload?.id);
        console.log('payload._id:', payload?._id);
        console.log('payload.userId:', payload?.userId);
        console.log('payload.sub:', payload?.sub);
        console.log('payload.email:', payload?.email);
        console.log('=======================');
        const idFromToken = payload?.id || payload?._id || payload?.userId || payload?.sub;
        if (idFromToken) {
            req.idPaciente = String(idFromToken);
            return next();
        }
        // Si no hay id en el token, intentar identificar al usuario por email en el payload
        const emailFromToken = payload?.email || payload?.correo || payload?.username;
        console.log('Email extraído del token:', emailFromToken);
        if (emailFromToken) {
            try {
                console.log('Buscando paciente por email:', String(emailFromToken).toLowerCase());
                const paciente = await Paciente.findOne({ email: String(emailFromToken).toLowerCase() }).select('_id');
                console.log('Paciente encontrado:', paciente);
                if (paciente && paciente._id) {
                    console.log('Asignando req.idPaciente:', String(paciente._id));
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
