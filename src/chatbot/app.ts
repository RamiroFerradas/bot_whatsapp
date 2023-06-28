import { ChatContext } from "../models/ChatContext";
import { User } from "../models/User";
import {
  checkDolarChanges,
  firstMessage,
  ramdomMessage,
  secondMessage,
} from "./automatizedMessages";
import { funnyMessage } from "./automatizedMessages/funnyMessage";
import {
  flowClima,
  flowTiempo,
  flujoBienvenida,
  flujoCrypto,
  flujoDolar,
} from "./flows";

require("dotenv").config();
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const cron = require("node-cron");

const usuarios: User[] = [
  {
    id: process.env.ID_RAMIRO || "",
    nombre: "Ramiro",
    ciudad: "Rafaela",
  },
  {
    id: process.env.ID_GABRIEL || "",
    nombre: "Gabriel",
    ciudad: "Salta",
  },
  {
    id: process.env.ID_BUGGA || "",
    nombre: "Matias",
    ciudad: "Rafaela",
  },
];
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
  ]);

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  // const BOTNAME = "BOTARDO";
  // QRPortalWeb({ name: BOTNAME, port: 3005 });
};

//Automatizar mensajes

// Configuración de la diferencia horaria para Argentina (GMT-3)
const timeZone = "America/Buenos_Aires";

// Programa la tarea para ejecutarse a las 08:00 AM (horario de Argentina)
cron.schedule(
  "00 11 * * *",
  () => {
    firstMessage(usuarios);
  },
  { scheduled: true, timezone: "America/Buenos_Aires" }
);
// Programa la tarea para ejecutarse a las 12:00 PM (horario de Argentina)
cron.schedule(
  "00 15 * * *",
  () => {
    secondMessage(usuarios);
  },
  { scheduled: true, timezone: "America/Buenos_Aires" }
);

// Programa la tarea para ejecutarse cada minuto (horario de Argentina)
cron.schedule(
  "* * * * *",
  () => {
    checkDolarChanges(usuarios);
  },
  { scheduled: true, timezone: "America/Buenos_Aires" }
);

cron.schedule(
  "30 20 * * *",
  () => {
    ramdomMessage(usuarios);
  },
  {
    scheduled: true,
    timezone: "America/Buenos_Aires",
  }
);
// cron.schedule(
//   "* * * * * *",
//   () => {
//     funnyMessage(usuarios);
//   },
//   {
//     scheduled: true,
//     timezone: "America/Buenos_Aires",
//   }
// );
// funnyMessage(usuarios);
