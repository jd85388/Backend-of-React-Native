import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Paciente from '../models/paciente';
import { enviarCorreo } from '../utils/enviarCorreo';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();

export const resgistrarPaciente = async (req: Request, res: Response) => {
    try {
        const { nombre, apellido, email, password, fechaNacimiento } = req.body;

        if (!nombre || !apellido || !email || !password || !fechaNacimiento) {
            return res.status(400).json({ message: 'Todos los campos son necesarios.'});
    }

    const existePaciente = await Paciente.findOne({ email});
    if (existePaciente) {
        return res.status(400).json({ message: 'El correo ya se encuentra registrado.'});
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoPaciente = new Paciente({
        nombre,
        apellido,
        email,
        passwordHash,
        fechaNacimiento,
    });

    await nuevoPaciente.save();

    const token = jwt.sign({ id: nuevoPaciente._id}, process.env.JWT_TOKEN as string);
    const link = `${process.env.FRONTEND_URL}/confirmar/${token}`;

    await enviarCorreo(email, 
        'Activar Cuenta', `<p>solo confirma we</p>`);

        res.status(201).json({ 
            id: nuevoPaciente._id,
            nombre: nuevoPaciente.nombre,
            apellido: nuevoPaciente.apellido,
            email: nuevoPaciente.email,
        });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor.'});
}
};