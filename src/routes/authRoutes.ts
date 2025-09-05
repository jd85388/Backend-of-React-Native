import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Paciente from '../models/paciente';

const EXPIRES = process.env.JWT_EXPIRES_IN || '1d';

export async function register(req, res) {
    const { nombre, apellido, email, password, fechaNacimiento, rol } = req.body;
    const exists = await Paciente.findOne({ email });
    if (exists) return res.status(409).json({ message: 'El email ya existe'});

    const hash = await bcrypt.hash(password, 12);
    
}