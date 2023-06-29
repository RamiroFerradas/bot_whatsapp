import { ChatContext } from "../models/ChatContext";
import {
  flowClima,
  flowTiempo,
  flujoBienvenida,
  flujoCreador,
  flujoCrypto,
  flujoDolar,
} from "./flows";

const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

export const adapterProvider = createProvider(BaileysProvider);
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
  ]);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  // const BOTNAME = "BOTARDO";
  // QRPortalWeb({ name: BOTNAME, port: 3005 });
};
