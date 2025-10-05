// src/controllers/authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Paciente from "../models/paciente.js";
import { ingresoUsuario } from "../services/ingreso.service.js";

export const loginController = async (req: Request, res: Response) => {
  try {
    
    const usuario = req.usuario as any;
    if (!usuario) {
      return res.status(400).json({ message: "No se recibió usuario autenticado" });
    }

    const { usuario: dataUsuario, accessToken: accessTokenFromService } = await ingresoUsuario(usuario);
    if (!accessTokenFromService) {
      throw new Error("No se pudo generar el access token");
    }
    const accessToken = accessTokenFromService;

    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret) {
      throw new Error("Falta la variable de entorno REFRESH_TOKEN_SECRET");
    }

    const refreshToken = jwt.sign(
      { sub: String(usuario._id), id: String(usuario._id), _id: String(usuario._id) },
      refreshTokenSecret,
      { expiresIn: "7d" }
    );

    await Paciente.findByIdAndUpdate(usuario._id, { refreshToken }, { new: true });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    return res.status(200).json({
      usuario: dataUsuario,
      accessToken,
    });
  } catch (err: any) {
    console.error("loginController error:", err?.message || err);
    return res.status(500).json({
      message: err?.message || "Tenemos problemas para procesar su solicitud",
    });
  }
};
