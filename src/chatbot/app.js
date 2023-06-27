require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const { HOST, ID_RAMIRO, ID_GABRIEL } = process.env;
const cron = require("node-cron");
const axios = require("axios");
const { getInfoDolar } = require("../services/getDolar.js");
const { getWeather } = require("../services/getWeather.js");
const { generarMessageClima } = require("../utils/mensajesPersonalizados.js");
const { flowClima } = require("./flows/clima.js");
const { getInfoCrypto } = require("../services/getBtc.js");
console.log(HOST);

const adapterProvider = createProvider(BaileysProvider);
const chatBot = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([flowClima]);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  const BOTNAME = "BOTARDO";
  // QRPortalWeb({ name: BOTNAME, port: 3005 });
};

//Automatizar mensajes

const automatizarMensajes = async (usuarios) => {
  try {
    for (const usuario of usuarios) {
      const { id, nombre, ciudad } = usuario;

      const { city, region, temperaturaC, temperaturaF, clima } =
        await getWeather(ciudad);
      const messageCLima = generarMessageClima(
        nombre,
        city,
        region,
        temperaturaC
      );

      const dolarInfo = await getInfoDolar();
      const cryptoInfo = await getInfoCrypto("btc");
      console.log(cryptoInfo);
      const climaMessage = `${messageCLima}\n`;
      const dolarMessage = `\nAdemás, te informo sobre el estado del dólar:\nCompra: *$${dolarInfo.compra}*\nVenta: *$${dolarInfo.venta}*.\n`;
      const btcMessage = `\nEl precio actual de Bitcoin (BTC) es: *$${cryptoInfo.toLocaleString()} USD.*\n`;

      const message = `${climaMessage}${dolarMessage} ${btcMessage}¡Que tengas un excelente día!,`;

      await axios.post(`${HOST}/api/send-message-bot?id=${id}`, {
        message,
      });
    }
  } catch (error) {
    console.error("Error al enviar la automatización:", error.message);
  }
};
cron.schedule("00 08 * * *", async () => {
  try {
    const usuarios = [
      {
        id: ID_RAMIRO,
        nombre: "Ramiro",
        ciudad: "Rafaela",
      },
      {
        id: ID_GABRIEL,
        nombre: "Gabriel",
        ciudad: "Salta",
      },
    ];

    await automatizarMensajes(usuarios);
  } catch (error) {
    console.error("Error al ejecutar la automatización:", error.message);
  }
});
module.exports = {
  chatBot,
  adapterProvider,
};