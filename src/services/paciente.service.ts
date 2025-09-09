import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Paciente from '../models/paciente.js';
import { enviarCorreoRegistro } from '../utils/CorreoRegistro.js';

export const crearPaciente = async (datos: {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  fechaNacimiento: Date;
  documento: number;
  numero: number;
}) => {
  const { nombre, apellido, email, password, fechaNacimiento, documento, numero } = datos;

  if (!nombre || !apellido || !email || !password || !fechaNacimiento || !documento || !numero) {
    throw new Error('Todos los campos son necesarios.');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const nuevoPaciente = new Paciente({
    nombre,
    apellido,
    email,
    passwordHash,
    fechaNacimiento,
    documento,
    numero,
  });

  const token = jwt.sign({ id: nuevoPaciente._id }, process.env.JWT_TOKEN as string);

  await enviarCorreoRegistro(email, nombre, token);
  await nuevoPaciente.save();

  return {
    id: nuevoPaciente._id,
    nombre: nuevoPaciente.nombre,
    apellido: nuevoPaciente.apellido,
    email: nuevoPaciente.email,
    fechaNacimiento: nuevoPaciente.fechaNacimiento,
    documento: nuevoPaciente.documento,
    numero: nuevoPaciente.numero,
  };
};