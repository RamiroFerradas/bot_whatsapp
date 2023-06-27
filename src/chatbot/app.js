require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const cron = require("node-cron");
const axios = require("axios");
const { getWeather } = require("../services/getWeather.js");
const { generarMessageClima } = require("../utils/mensajesPersonalizados.js");
const { getInfoCrypto } = require("../services/getBtc.js");
const { flowClima, flowTiempo } = require("./flows/clima.js");
const { flujoCrypto } = require("./flows/crypto.js");
const { flujoBienvenida } = require("./flows/bienvenida.js");
const { flujoDolar } = require("./flows/dolar.js");
const { getInfoDolar } = require("../services/getDolar.js");
const { HOST, ID_RAMIRO, ID_GABRIEL } = process.env;

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

const adapterProvider = createProvider(BaileysProvider);
adapterProvider.on("message", (ctx) => console.log(ctx));
const chatBot = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flowClima,
    flujoCrypto,
    flujoBienvenida,
    flujoDolar,
    flowTiempo,
  ]);

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
      const climaMessage = `${messageCLima}\n`;
      const dolarMessage = `\nAdemás, te informo sobre el estado del dólar:\nCompra: *$${dolarInfo.compra}*\nVenta: *$${dolarInfo.venta}*.\n`;
      const btcMessage = `\nEl precio actual de Bitcoin (BTC) es: *$${cryptoInfo.toLocaleString()} USD.*\n`;

      const message = `${climaMessage}${dolarMessage} ${btcMessage}¡Que tengas un excelente día!\n
      Si necesitas saber mis comandos escribe *ayuda*
      `;

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
    await automatizarMensajes(usuarios);
  } catch (error) {
    console.error("Error al ejecutar la automatización:", error.message);
  }
});

cron.schedule("00 12 * * *", async () => {
  const message = `¡Hola! Soy tu asistente automático. Estoy aquí para ayudarte con algunas consultas comunes:\n
- Si quieres saber el clima actual, simplemente pregúntame *¿Qué clima hace?* o cualquier variante relacionada como *¿Cómo está el día?* , *¿Hace calor?* , *¿Hace frío?* , *¿Cómo está afuera?* .\n
- Si estás interesado en el precio de Bitcoin (BTC), solo tienes que mencionar palabras clave como *btc* o *crypto*.\n
- Si deseas conocer el valor del dólar blue, solo pregúntame por *dólar* o *usd*.\n
¡Estoy aquí para brindarte información útil y responder a tus preguntas! Si necesitas algo más, no dudes en decírmelo. 😊`;

  try {
    for (const usuario of usuarios) {
      await axios.post(`${HOST}/api/send-message-bot?id=${usuario.id}`, {
        message,
      });
    }
  } catch (error) {
    console.error("Error al ejecutar la automatización:", error.message);
  }
});

module.exports = {
  chatBot,
  adapterProvider,
};
