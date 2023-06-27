require("dotenv").config();
const { ID_RAMIRO, ID_GABRIEL, ID_BUGGA } = process.env;
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const cron = require("node-cron");
const { flowClima, flowTiempo } = require("./flows/clima.js");
const { flujoCrypto } = require("./flows/crypto.js");
const { flujoBienvenida } = require("./flows/bienvenida.js");
const { flujoDolar } = require("./flows/dolar.js");
const {
  checkDolarChanges,
  firstMessage,
  secondMessage,
} = require("./automatizedMessages.js");

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
  {
    id: ID_BUGGA,
    nombre: "Matias",
    ciudad: "Rafaela",
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

cron.schedule("00 08 * * *", () => {
  firstMessage(usuarios);
});

cron.schedule("00 12 * * *", () => {
  secondMessage(usuarios);
});

// Programa la tarea para ejecutarse cada minuto
cron.schedule("* * * * *", () => {
  checkDolarChanges(usuarios);
});

module.exports = {
  chatBot,
  adapterProvider,
};
