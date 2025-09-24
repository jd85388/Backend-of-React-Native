import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import Paciente from '../models/paciente.js';

export const verificacionPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan email o contraseña' });
    }

  const paciente = await Paciente.findOne({ email }).select('+passwordHash');
    if (!paciente) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const coincide = await bcrypt.compare(password, paciente.passwordHash);
    if (!coincide) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    req.usuario = paciente;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
