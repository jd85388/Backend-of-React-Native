import { enviarCorreoGenerico } from "../utils/correoSoporte.js";
/**
 * Envía un mensaje de soporte al correo oficial
 * @param asunto - asunto del mensaje
 * @param mensaje - contenido del mensaje
 * @param usuario - nombre del usuario (opcional)
 * @param correo - correo del usuario
 */
export async function enviarMensajeSoporte(asunto, mensaje, usuario, correo) {
    const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 24px; background: #fafdff; border-radius: 12px;">
      <h2 style="color: #0e7fc0;">Nuevo mensaje de soporte</h2>
      ${usuario ? `<p><strong>Usuario:</strong> ${usuario}</p>` : ""}
      <p><strong>Correo:</strong> ${correo}</p>
      <p><strong>Asunto:</strong> ${asunto}</p>
      <p><strong>Mensaje:</strong></p>
      <div style="background: #fff; padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0;">
        ${mensaje}
      </div>
    </div>
  `;
    await enviarCorreoGenerico("soportelifereminder@gmail.com", `Soporte: ${asunto}`, html, correo);
}
