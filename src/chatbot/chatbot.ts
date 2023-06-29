import { ChatContext } from "../models/ChatContext";
import {
  flowClima,
  flowTiempo,
  flujoAgradecimiento,
  flujoBienvenida,
  flujoCreador,
  flujoCrypto,
  flujoDolar,
} from "./flows";

const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const QRPortalWeb = require("@bot-whatsapp/portal");

export const adapterProvider = createProvider(BaileysProvider, {
  // name: "bot",
});
adapterProvider.on("message", (ctx: ChatContext) => console.log(ctx.body));

export const chatBot = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    flowClima,
    flujoCrypto,
    flujoBienvenida,
    flujoDolar,
    flowTiempo,
    flujoCreador,
    flujoAgradecimiento,
  ]);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  // const BOTNAME = "BOTARDO2";
  // QRPortalWeb({ name: BOTNAME, port: 4005 });
};
