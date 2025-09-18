import mongoose from 'mongoose';

describe('Conexión a la base de datos', () => {
  it('debe conectar correctamente a MongoDB', async () => {
    const uri = process.env.MONGO || '';
    const conn = await mongoose.connect(uri);
    expect(conn.connection.readyState).toBe(1); // 1 = conectado
    await mongoose.disconnect();
  });
});
