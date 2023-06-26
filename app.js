const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const express = require("express");
const { join } = require("path");
const { createReadStream } = require("fs");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const app = express();

const { flowPrincipal } = require("./flows/restaurante.js");
const { flowClima } = require("./flows/clima.js");

const BOTNAME = "BOTARDO";
QRPortalWeb({ name: BOTNAME, port: 3005 });

app.get("/get-qr", async (_, res) => {
  const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
  const fileStream = createReadStream(YOUR_PATH_QR);

  res.writeHead(200, { "Content-Type": "image/png" });
  fileStream.pipe(res);
});

const chatBot = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowClima]);
  const adapterProvider = createProvider(BaileysProvider);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  // QRPortalWeb();
};

module.exports = chatBot;
