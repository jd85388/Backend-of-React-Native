import { Request, Response } from 'express';
declare class DisponibilidadController {
    obtenerEspecialidades(req: Request, res: Response): Promise<void>;
    obtenerMedicosPorEspecialidad(req: Request, res: Response): Promise<void>;
    obtenerHorariosDisponibles(req: Request, res: Response): Promise<void>;
    reservarCita(req: Request, res: Response): Promise<void>;
    obtenerCitasPaciente(req: Request, res: Response): Promise<void>;
    cancelarCita(req: Request, res: Response): Promise<void>;
    reprogramarCita(req: Request, res: Response): Promise<void>;
    obtenerAgendaMedico(req: Request, res: Response): Promise<void>;
    poblarDatosEjemplo(req: Request, res: Response): Promise<void>;
    obtenerDisponibilidad(req: Request, res: Response): Promise<void>;
}
declare const _default: DisponibilidadController;
export default _default;
//# sourceMappingURL=disponibilidadController.d.ts.map