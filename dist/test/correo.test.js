import { envioCorreoRegistro } from "../utils/enviarCorreo";
describe('enviarCorreoRegistro', () => {
    it('debe enviar correo correctamente', async () => {
        // Mock de la función de envío
        jest.spyOn(console, 'log').mockImplementation(() => { });
        const result = await envioCorreoRegistro('Juan', 'juan@email.com', 'token123');
        expect(result).toBeTruthy();
    });
});
