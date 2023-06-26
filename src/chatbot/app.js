require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const { HOST, ID_RAMIRO } = process.env;
const { flowPrincipal, getMenuFormatted } = require("./flows/restaurante.js");
const { flowClima } = require("./flows/clima.js");
const cron = require("node-cron");
const axios = require("axios");
const { getInfoDolar } = require("../services/getDolar.js");
const BOTNAME = "BOTARDO";
QRPortalWeb({ name: BOTNAME, port: 3005 });

const adapterDB = new MockAdapter();
const adapterFlow = createFlow([flowClima]);
const adapterProvider = createProvider(BaileysProvider);

const chatBot = async () => {
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  QRPortalWeb();
};

//Automatizar mensajes
cron.schedule("00 08 * * *", async () => {
  try {
    const dolarInfo = await getInfoDolar();
    const message = `Fecha: ${dolarInfo.fecha}\nCompra: $${dolarInfo.compra}\nVenta: $${dolarInfo.venta}`;

    await axios.post(`${HOST}/api/send-message-bot?id=${ID_RAMIRO}`, {
      message,
    });
  } catch (error) {
    console.error("Error al enviar la automatización:", error.message);
  }
});

module.exports = {
  chatBot,
  adapterProvider,
};
