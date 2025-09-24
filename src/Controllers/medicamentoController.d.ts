import { Request, Response } from 'express';
declare class MedicamentoController {
    crearMedicamento(req: Request, res: Response): Promise<void>;
    obtenerMedicamentosPaciente(req: Request, res: Response): Promise<void>;
    obtenerMedicamentoPorId(req: Request, res: Response): Promise<void>;
    actualizarMedicamento(req: Request, res: Response): Promise<void>;
    eliminarMedicamento(req: Request, res: Response): Promise<void>;
    obtenerMedicamentosActivos(req: Request, res: Response): Promise<void>;
    obtenerRecordatoriosDelDia(req: Request, res: Response): Promise<void>;
}
declare const _default: MedicamentoController;
export default _default;
//# sourceMappingURL=medicamentoController.d.ts.map