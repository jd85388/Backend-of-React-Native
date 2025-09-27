import { IMedicamentos } from '../models/medicamentos.js';
export declare class MedicamentoService {
    static crearMedicamento(medicamentoData: any): Promise<IMedicamentos>;
    static obtenerMedicamentos(): Promise<IMedicamentos[]>;
    static obtenerMedicamentoPorId(id: string): Promise<IMedicamentos | null>;
    static actualizarMedicamento(id: string, medicamentoData: Partial<IMedicamentos>): Promise<IMedicamentos | null>;
    static eliminarMedicamento(id: string): Promise<IMedicamentos | null>;
    static obtenerMedicamentosPorPaciente(idPaciente: string): Promise<IMedicamentos[]>;
    static obtenerMedicamentosActivos(idPaciente: string): Promise<IMedicamentos[]>;
    static obtenerMedicamentosVencidos(idPaciente: string): Promise<IMedicamentos[]>;
    static obtenerMedicamentosPorVencer(idPaciente: string, dias?: number): Promise<IMedicamentos[]>;
    static obtenerRecordatoriosDelDia(idPaciente: string, fecha: Date): Promise<IMedicamentos[]>;
    static cambiarEstadoMedicamento(id: string, estado: boolean): Promise<IMedicamentos | null>;
    static obtenerEstadisticasMedicamentos(idPaciente: string): Promise<any>;
}
//# sourceMappingURL=medicamento.service.d.ts.map