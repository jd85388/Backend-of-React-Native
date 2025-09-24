import { Request, Response } from 'express';
declare class CitaController {
    crearCita(req: Request, res: Response): Promise<void>;
    obtenerCitasPaciente(req: Request, res: Response): Promise<void>;
    obtenerCitaPorId(req: Request, res: Response): Promise<void>;
    actualizarCita(req: Request, res: Response): Promise<void>;
    cancelarCita(req: Request, res: Response): Promise<void>;
    obtenerCitasProximas(req: Request, res: Response): Promise<void>;
    obtenerCitasDelDia(req: Request, res: Response): Promise<void>;
    obtenerEstadisticasCitas(req: Request, res: Response): Promise<void>;
}
declare const _default: CitaController;
export default _default;
//# sourceMappingURL=citaController.d.ts.map