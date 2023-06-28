import { Router, Request, Response } from "express";
import { join } from "path";
import { createReadStream } from "fs";
import cron from "node-cron";
import axios from "axios";

require("dotenv").config();

const router: Router = Router();
const { adapterProvider } = require("../chatbot/app");
const verificarAutenticacion = require("./auth");

// Middleware para verificar la autenticación

router.get("/get-qr", verificarAutenticacion, (req: Request, res: Response) => {
  const botname = req.query.botname || "bot";
  const YOUR_PATH_QR = join(process.cwd(), `${botname}.qr.png`);
  const fileStream = createReadStream(YOUR_PATH_QR);

  res.writeHead(200, { "Content-Type": "image/png" });
  fileStream.pipe(res);
});

router.post("/send-message-bot", async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const { message } = req.body;

    await adapterProvider.sendText(id, message);
    res.send({ data: "enviado!" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
});

router.get("/ping", (req: Request, res: Response) => {
  // Generar una respuesta aleatoria
  const responses = ["Pong!", "Hello!", "Hi there!", "¡Hola!", "Response"];
  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  // Simular un tiempo de respuesta aleatorio
  const randomDelay = Math.floor(Math.random() * 500) + 100;
  setTimeout(() => {
    res.send(randomResponse);
  }, randomDelay);
});

// enviar ping solamente en producción cada un minuto
const applyDelay =
  !process.env.HOST?.includes("localhost") &&
  !process.env.HOST?.includes("railway");
if (applyDelay) {
  cron.schedule("*/10 * * * *", async () => {
    // Se ejecuta cada 10 minutos
    try {
      await axios.get(`${process.env.HOST}/api/ping`);
    } catch (error: any) {
      console.error("Error al ejecutar la automatización:", error.message);
    }
  });
}

module.exports = router;
