import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const verificarAutenticacion = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  // Verifica si el token es válido
  if (token === process.env.TOKEN) {
    next();
  } else {
    res.status(401).send("Acceso no autorizado");
  }
};

module.exports = verificarAutenticacion;
