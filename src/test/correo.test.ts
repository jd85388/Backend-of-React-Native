import { enviarCorreoRegistro } from '../utils/CorreoRegistro';

describe('enviarCorreoRegistro', () => {
  it('debe enviar correo correctamente', async () => {
    // Mock de la función de envío
    jest.spyOn(console, 'log').mockImplementation(() => {});
    const result = await enviarCorreoRegistro('Juan', 'juan@email.com', 'token123');
    expect(result).toBeTruthy();
  });
});
