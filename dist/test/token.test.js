import jwt from 'jsonwebtoken';
describe('Generación de token', () => {
    it('debe generar un token si el usuario ya está registrado', () => {
        const payload = { id: 'usuario123' };
        const token = jwt.sign(payload, 'Life_Reminder_03');
        expect(typeof token).toBe('string');
        expect(token.length).toBeGreaterThan(0);
    });
});
