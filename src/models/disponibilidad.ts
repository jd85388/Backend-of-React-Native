import { Model, Schema, model, Document } from "mongoose";

// Interfaz para disponibilidad de médicos
export interface IDisponibilidad extends Document {
    medico: {
        nombre: string;
        apellido: string;
        cedula: string;
        telefono: string;
        email: string;
    };
    especialidad: {
        nombre: string;
        codigo: string;
        descripcion: string;
    };
    consultorio: {
        numero: string;
        edificio: string;
        piso: number;
        direccion: string;
        telefono: string;
    };
    horarios: [{
        dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
        horaInicio: string; // "08:00"
        horaFin: string; // "17:00"
        intervaloMinutos: number; // 30 minutos por cita
        descansos: [{
            inicio: string; // "12:00"
            fin: string; // "13:00"
        }];
    }];
    fechasNoDisponibles: Date[]; // Vacaciones, permisos, etc.
    estado: boolean;
    tarifa: number;
    observaciones?: string;
}

// Interfaz para citas programadas
export interface ICitaProgramada extends Document {
    disponibilidadId: Schema.Types.ObjectId;
    pacienteId: Schema.Types.ObjectId;
    fecha: Date;
    hora: string;
    duracionMinutos: number;
    estado: 'programada' | 'confirmada' | 'en_curso' | 'completada' | 'cancelada' | 'no_asistio';
    motivo: string;
    observacionesPaciente?: string;
    observacionesMedico?: string;
    fechaCreacion: Date;
    fechaModificacion: Date;
}

const DisponibilidadSchema: Schema = new Schema({
    medico: {
        nombre: { type: String, required: true, trim: true },
        apellido: { type: String, required: true, trim: true },
        cedula: { type: String, required: true, unique: true, trim: true },
        telefono: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true }
    },
    especialidad: {
        nombre: { type: String, required: true, trim: true },
        codigo: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true }
    },
    consultorio: {
        numero: { type: String, required: true, trim: true },
        edificio: { type: String, required: true, trim: true },
        piso: { type: Number, required: true, min: 0, max: 50 },
        direccion: { type: String, required: true, trim: true },
        telefono: { type: String, trim: true }
    },
    horarios: [{
        dia: { 
            type: String, 
            required: true,
            enum: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']
        },
        horaInicio: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
        horaFin: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
        intervaloMinutos: { type: Number, required: true, min: 15, max: 120, default: 30 },
        descansos: [{
            inicio: { type: String, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
            fin: { type: String, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ }
        }]
    }],
    fechasNoDisponibles: [{ type: Date }],
    estado: { type: Boolean, default: true },
    tarifa: { type: Number, required: true, min: 0 },
    observaciones: { type: String, trim: true, maxlength: 500 }
}, { timestamps: true });

const CitaProgramadaSchema: Schema = new Schema({
    disponibilidadId: { type: Schema.Types.ObjectId, ref: 'Disponibilidad', required: true },
    pacienteId: { type: Schema.Types.ObjectId, ref: 'paciente', required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true, match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ },
    duracionMinutos: { type: Number, required: true, min: 15, max: 120, default: 30 },
    estado: { 
        type: String, 
        required: true,
        enum: ['programada', 'confirmada', 'en_curso', 'completada', 'cancelada', 'no_asistio'],
        default: 'programada'
    },
    motivo: { type: String, required: true, trim: true, maxlength: 500 },
    observacionesPaciente: { type: String, trim: true, maxlength: 500 },
    observacionesMedico: { type: String, trim: true, maxlength: 500 },
    fechaCreacion: { type: Date, default: Date.now },
    fechaModificacion: { type: Date, default: Date.now }
}, { timestamps: true });

// Índices para optimizar consultas
DisponibilidadSchema.index({ 'especialidad.codigo': 1, estado: 1 });
DisponibilidadSchema.index({ 'medico.cedula': 1 });
DisponibilidadSchema.index({ 'consultorio.numero': 1, 'consultorio.edificio': 1 });

CitaProgramadaSchema.index({ disponibilidadId: 1, fecha: 1, hora: 1 });
CitaProgramadaSchema.index({ pacienteId: 1, fecha: 1 });
CitaProgramadaSchema.index({ fecha: 1, estado: 1 });

// Middleware para actualizar fechaModificacion
CitaProgramadaSchema.pre('save', function(next) {
    if (this.isModified() && !this.isNew) {
        this.fechaModificacion = new Date();
    }
    next();
});

export const Disponibilidad: Model<IDisponibilidad> = model<IDisponibilidad>('Disponibilidad', DisponibilidadSchema);
export const CitaProgramada: Model<ICitaProgramada> = model<ICitaProgramada>('CitaProgramada', CitaProgramadaSchema);

export default { Disponibilidad, CitaProgramada };