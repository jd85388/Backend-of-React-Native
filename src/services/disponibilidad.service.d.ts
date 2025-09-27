import { IDisponibilidad, ICitaProgramada } from '../models/disponibilidad.js';
export declare class DisponibilidadService {
    obtenerEspecialidades(): Promise<any[]>;
    obtenerMedicosPorEspecialidad(codigoEspecialidad: string): Promise<any[]>;
    obtenerDisponibilidadMedico(disponibilidadId: string): Promise<IDisponibilidad | null>;
    obtenerHorariosDisponibles(disponibilidadId: string, fecha: Date): Promise<any[]>;
    reservarCita(datosReserva: {
        disponibilidadId: string;
        pacienteId: string;
        fecha: Date;
        hora: string;
        motivo: string;
        observacionesPaciente?: string;
    }): Promise<ICitaProgramada>;
    obtenerCitasPaciente(pacienteId: string): Promise<any[]>;
    cancelarCita(citaId: string, motivo?: string): Promise<ICitaProgramada | null>;
    reprogramarCita(citaId: string, nuevaFecha: Date, nuevaHora: string): Promise<ICitaProgramada | null>;
    obtenerAgendaMedico(disponibilidadId: string, fecha: Date): Promise<any>;
    private convertirHoraAMinutos;
    private convertirMinutosAHora;
    poblarDatosEjemplo(): Promise<void>;
}
declare const _default: DisponibilidadService;
export default _default;
//# sourceMappingURL=disponibilidad.service.d.ts.map