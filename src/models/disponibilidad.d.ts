import { Model, Schema, Document } from "mongoose";
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
    horarios: [
        {
            dia: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
            horaInicio: string;
            horaFin: string;
            intervaloMinutos: number;
            descansos: [
                {
                    inicio: string;
                    fin: string;
                }
            ];
        }
    ];
    fechasNoDisponibles: Date[];
    estado: boolean;
    tarifa: number;
    observaciones?: string;
}
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
export declare const Disponibilidad: Model<IDisponibilidad>;
export declare const CitaProgramada: Model<ICitaProgramada>;
declare const _default: {
    Disponibilidad: Model<IDisponibilidad, {}, {}, {}, Document<unknown, {}, IDisponibilidad, {}, {}> & IDisponibilidad & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
    CitaProgramada: Model<ICitaProgramada, {}, {}, {}, Document<unknown, {}, ICitaProgramada, {}, {}> & ICitaProgramada & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, any>;
};
export default _default;
//# sourceMappingURL=disponibilidad.d.ts.map