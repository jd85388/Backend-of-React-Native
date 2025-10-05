// controllers/contacto.controller.ts
import { Request, Response } from "express";
import { enviarMensajeSoporte } from "../services/contactarSoporte.service.js";

export const contactarSoporte = async (req: Request, res: Response) => {
  try {
    const { asunto, mensaje, usuario, correo } = req.body;

    if (!asunto?.trim() || !mensaje?.trim()) {
      return res.status(400).json({ message: "Asunto y mensaje son requeridos" });
    }

    await enviarMensajeSoporte(asunto, mensaje, usuario, correo);

    res.json({ message: "Mensaje enviado correctamente al equipo de soporte" });
  } catch (err: any) {
    console.error("Error al enviar mensaje:", err.message || err);
    res.status(500).json({ message: "No se pudo enviar el mensaje", error: err.message });
  }
};