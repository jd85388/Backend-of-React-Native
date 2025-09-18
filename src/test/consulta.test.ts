import { registrarConsulta } from '../Controllers/registroConsulta';

describe('registrarConsulta', () => {
  it('debe registrar una consulta correctamente', async () => {
    const req: any = { body: {
      id_Paciente: 'id123',
      especialidad: 'Medicina General',
      doctor: 'Dr. House',
      fecha: new Date(),
      motivo: 'Dolor de cabeza',
      estado: true,
      direccion: 'Calle 123',
      recordatorio: false,
      prioridad: 'media'
    } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await registrarConsulta(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});
