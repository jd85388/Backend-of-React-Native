import { Schema, model } from 'mongoose';
const PacienteShema = new Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    passwordHash: { type: String, required: true, select: false },
    fechaNacimiento: { type: Date, required: true },
    rol: { type: String, enum: ['paciente', 'admin', 'doctor'], default: 'paciente' },
    estado: { type: Boolean, default: true },
    funciones: { type: [String], default: [] },
}, { timestamps: true });
const Paciente = model('Paciente', PacienteShema);
export default Paciente;
