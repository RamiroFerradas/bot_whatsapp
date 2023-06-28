"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const verificarAutenticacion = (req, res, next) => {
    const token = req.headers.authorization;
    // Verifica si el token es válido
    if (token === process.env.TOKEN) {
        next();
    }
    else {
        res.status(401).send("Acceso no autorizado");
    }
};
module.exports = verificarAutenticacion;
