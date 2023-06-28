"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const app_2 = require("./src/chatbot/app");
require("dotenv").config();
const { HOST, PORT } = process.env;
const port = PORT || 3001;
const isProduction = !HOST || !HOST.includes("localhost");
// Start server
app_1.default.listen(port, () => {
    const whatsappText = "\x1b[32mWhatsApp\x1b[35m";
    const conexionExitosaTexto = "✨ \x1b[35m¡Conexión exitosa! El servidor está listo para brillar ✨\x1b[0m";
    const environmentText = isProduction ? "producción" : "desarrollo";
    console.log(`${conexionExitosaTexto}
🚀 Escuchando en el puerto: \x1b[33m${port}\x1b[0m
🌍 Entorno: \x1b[36m${environmentText.toUpperCase()}\x1b[0m`);
    (0, app_2.chatBot)()
        .then(() => {
        console.log(`🤖 Bot de ${whatsappText} \x1b[37mconectado\x1b[0m`);
    })
        .catch((error) => {
        console.error("Error al ejecutar chatBot:", error.message);
    });
});
// Utilizar la función
