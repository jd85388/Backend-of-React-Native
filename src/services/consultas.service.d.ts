import { Iconsulta } from "../models/consultas.js";
export declare class ConsultaService {
    static crearConsulta(consultaData: any): Promise<Iconsulta>;
    static obtenerConsultas(): Promise<Iconsulta[]>;
    static obtenerConsultaPorId(id: string): Promise<Iconsulta | null>;
    static actualizarConsulta(id: string, consultaData: Partial<Iconsulta>): Promise<Iconsulta | null>;
    static eliminarConsulta(id: string): Promise<Iconsulta | null>;
    static obtenerConsultasPorPaciente(idPaciente: string): Promise<Iconsulta[]>;
    static obtenerConsultasEnRango(idPaciente: string, fechaInicio: Date, fechaFin: Date): Promise<Iconsulta[]>;
    static obtenerConsultasProximas(idPaciente: string, dias?: number): Promise<Iconsulta[]>;
    static obtenerConsultasPasadas(idPaciente: string): Promise<Iconsulta[]>;
    static obtenerConsultasPorEspecialidad(idPaciente: string, especialidad: string): Promise<Iconsulta[]>;
    static obtenerConsultasPorPrioridad(idPaciente: string, prioridad: 'baja' | 'media' | 'alta'): Promise<Iconsulta[]>;
    static cambiarEstadoConsulta(id: string, estado: boolean): Promise<Iconsulta | null>;
    static obtenerEstadisticasCitas(idPaciente: string): Promise<any>;
    static obtenerConsultasConRecordatorio(idPaciente: string): Promise<Iconsulta[]>;
}
//# sourceMappingURL=consultas.service.d.ts.map