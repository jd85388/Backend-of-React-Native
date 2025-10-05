import Paciente from "../models/paciente.js";

export const Datos = async (
  id: string,
  datos: {
    nombre: string;
    apellido: string;
    email: string;
    numero: number;
  }
) => {
  const { nombre, apellido, email, numero } = datos;

  if (
    !nombre.trim() ||
    !apellido.trim() ||
    !email.trim() ||
    typeof numero !== "number"
  ) {
    throw new Error("Todos los campos son requeridos para actualizar los datos");
  }

  const paciente = await Paciente.findByIdAndUpdate(
    id,
    { $set: { nombre, apellido, email, numero } },
    { new: true, runValidators: true }
  );

  if (!paciente) {
    throw new Error("Paciente no encontrado");
  }

  return paciente;
};