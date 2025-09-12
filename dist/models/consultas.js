import { model, Schema } from 'mongoose';
export const consultaShema = new Schema({
    id_Paciente: { type: Schema.Types.ObjectId, ref: 'paciente', required: true },
    especialidad: { type: String, required: [true, 'El campo especialidad es obligatorio'], trim: true },
    doctor: { type: String, required: [true, 'El campo doctor es obligatorio'], trim: true },
    fecha: { type: Date, required: [true, 'El campo fecha es obligatorio'] },
    motivo: { type: String, required: [true, 'El campo motivo es obligatorio'], trim: true, minlength: 10, maxlength: 500 },
    estado: { type: Boolean, default: true },
    direccion: { type: String, required: [true, 'El campo direccion es obligatorio'], trim: true, maxlength: 50 },
    observacion: { type: String, trim: true, maxlength: 500 },
    recordatorio: { type: Boolean, enum: [true, false] },
    prioridad: { type: String, enum: ['baja', 'media', 'alta'] },
}, { timestamps: true });
export const Consulta = model('Consulta', consultaShema);
export default Consulta;
