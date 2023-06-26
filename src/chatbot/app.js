const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const { flowPrincipal } = require("./flows/restaurante.js");
const { flowClima } = require("./flows/clima.js");

const BOTNAME = "BOTARDO";
QRPortalWeb({ name: BOTNAME, port: 3005 });

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
