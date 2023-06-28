"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = require("path");
const fs_1 = require("fs");
var cron = require("node-cron");
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
const router = (0, express_1.Router)();
const { adapterProvider } = require("../chatbot/app");
const verificarAutenticacion = require("./auth");
// Middleware para verificar la autenticación
router.get("/get-qr", verificarAutenticacion, (req, res) => {
    const botname = req.query.botname || "bot";
    const YOUR_PATH_QR = (0, path_1.join)(process.cwd(), `${botname}.qr.png`);
    const fileStream = (0, fs_1.createReadStream)(YOUR_PATH_QR);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
});
router.post("/send-message-bot", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const { message } = req.body;
        yield adapterProvider.sendText(id, message);
        res.send({ data: "enviado!" });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Error al enviar el mensaje" });
    }
}));
router.get("/ping", (req, res) => {
    // Generar una respuesta aleatoria
    const responses = ["Pong!", "Hello!", "Hi there!", "¡Hola!", "Response"];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    // Simular un tiempo de respuesta aleatorio
    const randomDelay = Math.floor(Math.random() * 500) + 100;
    setTimeout(() => {
        res.send(randomResponse);
    }, randomDelay);
});
// enviar ping solamente en producción cada un minuto
const applyDelay = !((_a = process.env.HOST) === null || _a === void 0 ? void 0 : _a.includes("localhost")) &&
    !((_b = process.env.HOST) === null || _b === void 0 ? void 0 : _b.includes("railway"));
if (applyDelay) {
    cron.schedule("*/10 * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        // Se ejecuta cada 10 minutos
        try {
            yield axios_1.default.get(`${process.env.HOST}/api/ping`);
        }
        catch (error) {
            console.error("Error al ejecutar la automatización:", error.message);
        }
    }));
}
module.exports = router;
