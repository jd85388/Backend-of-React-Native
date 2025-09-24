import { Model, Schema, Document } from "mongoose";
export interface IMedicamentos extends Document {
    id_Paciente: Schema.Types.ObjectId;
    nombre: string;
    dosis: number;
    unidad: string;
    frecuencia: string;
    viaAdministracion: string;
    duracion: {
        inicio: Date;
        fin: Date;
    };
    recetadoPor: string;
    descripcion: string;
    notas: string;
    estado: boolean;
    causaUso: string;
}
declare const Medicamento: Model<IMedicamentos>;
export default Medicamento;
//# sourceMappingURL=medicamentos.d.ts.map