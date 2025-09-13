import Paciente from "../models/paciente";

declare global {
  namespace Express {
    interface Request {
      usuario?: PacienteDocument;
    }
  }
}
