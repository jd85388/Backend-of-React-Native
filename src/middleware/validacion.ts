// src/middleware/verificacionPassword.ts
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import Paciente from '../models/paciente.js';

export const verificacionPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = (req.body.email || req.body.correo || '').toString().trim().toLowerCase();
    const password = (req.body.password || '').toString();

    if (!email || !password) {
      return res.status(400).json({ message: 'Faltan email o contraseña' });
    }

    const paciente = await Paciente.findOne({ email }).select('+passwordHash');
    if (!paciente) {
      return res.status(401).json({ message: 'Usuario o contraseña inválidos' });
    }

    const coincide = await bcrypt.compare(password, paciente.passwordHash);
    if (!coincide) {
      return res.status(401).json({ message: 'Usuario o contraseña inválidos' });
    }
    req.usuario = paciente;
    next();
  } catch (error) {
    console.error('verificacionPassword error');
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};