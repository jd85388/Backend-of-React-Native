process.env.JWT_TOKEN = 'Life_Reminder_03';
import { crearPaciente } from '../services/paciente.service';
import Paciente from '../models/paciente';
import { enviarCorreoRegistro } from '../utils/CorreoRegistro';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

jest.mock('../utils/CorreoRegistro', () => ({
  enviarCorreoRegistro: jest.fn(),
}));

jest.mock('jsonwebtoken', () => {
  const actual = jest.requireActual('jsonwebtoken');
  return {
    ...actual,
    sign: jest.fn(() => 'mocked_jwt_token'),
  };
});



describe('service: crearPaciente', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe lanzar error si falta algun campo', async () => {
    const datosIncompletos = {
      nombre: 'juan',
      apellido: 'perez',
    };

    await expect(crearPaciente(datosIncompletos as any))
      .rejects
      .toThrow('Todos los campos son necesarios.');
  });

  it('debe crear un paciente correctamente con todos los campos validados', async () => {
    const datosCompletos = {
      nombre: 'juan',
      apellido: 'hernandez',
      email: 'jd8538879@gmail.com',
      password: '1234455',
      fechaNacimiento: new Date('1990-01-05'),
      documento: 1000694556,
      numero: 3229228590,
    };

    
    jest
      .spyOn(Paciente.prototype, 'save')
      .mockResolvedValueOnce({
        _id: 'mocked_id',
        ...datosCompletos,
      } as any);

    const resultado = await crearPaciente(datosCompletos);

    expect(resultado.email).toBe(datosCompletos.email);
    expect(resultado.nombre).toBe(datosCompletos.nombre);
    expect(resultado.documento).toEqual(datosCompletos.documento);

    // Verifica que jwt.sign fue llamado correctamente
    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
      'Life_Reminder_03'
    );

    // Verifica que enviarCorreoRegistro fue llamado correctamente
    expect(enviarCorreoRegistro).toHaveBeenCalledWith(
      datosCompletos.nombre,
      datosCompletos.email,
      'mocked_jwt_token'
    );
  });
});