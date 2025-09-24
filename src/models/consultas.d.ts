import { Model, Schema, Document } from 'mongoose';
export interface Iconsulta extends Document {
    id_Paciente: Schema.Types.ObjectId;
    especialidad: string;
    doctor: string;
    fecha: Date;
    motivo: string;
    estado: boolean;
    direccion: string;
    observacion?: string;
    recordatorio: boolean;
    prioridad: 'baja' | 'media' | 'alta';
}
export declare const consultaShema: Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    doctor: string;
    estado: boolean;
    fecha: NativeDate;
    motivo: string;
    id_Paciente: import("mongoose").Types.ObjectId;
    especialidad: string;
    direccion: string;
    observacion?: string | null;
    recordatorio?: boolean | null;
    prioridad?: "baja" | "media" | "alta" | null;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    doctor: string;
    estado: boolean;
    fecha: NativeDate;
    motivo: string;
    id_Paciente: import("mongoose").Types.ObjectId;
    especialidad: string;
    direccion: string;
    observacion?: string | null;
    recordatorio?: boolean | null;
    prioridad?: "baja" | "media" | "alta" | null;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    doctor: string;
    estado: boolean;
    fecha: NativeDate;
    motivo: string;
    id_Paciente: import("mongoose").Types.ObjectId;
    especialidad: string;
    direccion: string;
    observacion?: string | null;
    recordatorio?: boolean | null;
    prioridad?: "baja" | "media" | "alta" | null;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Consulta: Model<Iconsulta>;
export default Consulta;
//# sourceMappingURL=consultas.d.ts.map