import { Schema, model, Model, Document } from 'mongoose';

export interface IPaciente extends Document {
    nombre: string;
    apellido: string;
    email: string;
    passwordHash: string;
    fechaNacimiento: Date;
    rol: 'paciente' | 'admin' | 'doctor';
    estado: boolean;
    funciones: string[];
    createdAt: Date;
    updatedAt: Date;
}
const PacienteShema = new Schema({
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    passwordHash: { type: String, required: true, select: false },
    fechaNacimiento: { type: Date, required: true },
    rol: { type: String, enum: ['paciente', 'admin', 'doctor'], default: 'paciente'},
    estado: { type: Boolean, default: true},
    funciones: { type: [String], default: []},
}, { timestamps: true});

const Paciente: Model<IPaciente> = model<IPaciente>('Paciente', PacienteShema);
export default Paciente;