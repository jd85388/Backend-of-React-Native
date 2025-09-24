import { Model, Document } from 'mongoose';
export interface IPaciente extends Document {
    nombre: string;
    apellido: string;
    email: string;
    passwordHash: string;
    fechaNacimiento: Date;
    documento: number;
    numero: number;
    rol: 'paciente' | 'admin' | 'doctor';
    estado: boolean;
    funciones: string[];
    createdAt: Date;
    updatedAt: Date;
}
declare const Paciente: Model<IPaciente>;
export default Paciente;
//# sourceMappingURL=paciente.d.ts.map