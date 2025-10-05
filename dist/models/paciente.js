import { Schema, model } from 'mongoose';
const PacienteShema = new Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    documento: { type: Number, required: true, min: 1000000, },
    numero: { type: Number, required: true, unique: false, match: /^[0-9]{10}$/ },
    passwordHash: { type: String, required: true, select: false },
    fechaNacimiento: { type: Date, required: true, validate: {
            validator: (value) => value <= new Date(),
            message: 'la fecha no puede ser futura',
        } },
    foto: { type: String, required: false, select: false },
    rol: { type: String, enum: ['paciente', 'admin', 'doctor'], default: 'paciente' },
    estado: { type: Boolean, default: true },
    funciones: { type: [String], default: [] },
}, { timestamps: true });
const Paciente = model('Paciente', PacienteShema);
export default Paciente;
