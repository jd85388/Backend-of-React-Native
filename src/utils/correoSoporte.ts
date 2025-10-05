// utils/correo.ts
import { resend } from "../index.js";

/**
 * Envía un correo usando Resend
 * @param to - destinatario
 * @param subject - asunto
 * @param html - contenido HTML
 */
export async function enviarCorreoGenerico(
  to: string,
  subject: string,
  html: string,
  replyTo?: string
): Promise<void> {
  try {
    await resend.emails.send({
      from: "soportelifereminder <onboarding@resend.dev>",
      to,
      subject,
      html,
      reply_to: replyTo,
    } as any);
    console.log(`Correo enviado a ${to}`);
  } catch (error) {
    console.error("Error al enviar correo", error);
    throw error;
  }
}