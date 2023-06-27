require("dotenv").config();
const express = require("express");
const { join } = require("path");
const { createReadStream } = require("fs");
const { verificarAutenticacion } = require("./auth");
// const { adapterProvider } = require("../chatbot/app");
const { HOST } = process.env;
const cron = require("node-cron");
const axios = require("axios");
const router = express.Router();

const menusData = require("../chatbot/menus.json");
const { adapterProvider } = require("../chatbot/app");

router.get("/menus", (req, res) => {
  try {
    res.json(menusData);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los menús" });
  }
});

// Middleware para verificar la autenticación

router.get("/get-qr", verificarAutenticacion, (req, res) => {
  const botname = req.query.botname || "bot";
  const YOUR_PATH_QR = join(process.cwd(), `${botname}.qr.png`);
  const fileStream = createReadStream(YOUR_PATH_QR);

  res.writeHead(200, { "Content-Type": "image/png" });
  fileStream.pipe(res);
});

router.post("/send-message-bot", async (req, res) => {
  try {
    const { id } = req.query;
    const { message } = req.body;
    console.log(message);
    await adapterProvider.sendText(id, message);
    console.log("Mensaje enviado mediante método POST:", message);
    res.send({ data: "enviado!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error al enviar el mensaje" });
  }
});

router.get("/ping", (req, res) => {
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

//enviar ping solamente en produccion cada un minuto
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) {
  cron.schedule("* * * * *", async () => {
    try {
      await axios.get(`${HOST}/api/ping`);
    } catch (error) {
      console.error("Error al ejecutar la automatización:", error.message);
    }
  });
}
module.exports = router;
