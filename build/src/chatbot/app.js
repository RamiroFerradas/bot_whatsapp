"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatBot = exports.adapterProvider = void 0;
const automatizedMessages_1 = require("./automatizedMessages");
const flows_1 = require("./flows");
require("dotenv").config();
const { ID_RAMIRO, ID_GABRIEL, ID_BUGGA } = process.env;
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");
const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");
const cron = require("node-cron");
const usuarios = [
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
exports.adapterProvider = createProvider(BaileysProvider);
exports.adapterProvider.on("message", (ctx) => console.log(ctx.body));
const chatBot = () => __awaiter(void 0, void 0, void 0, function* () {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([
        flows_1.flowClima,
        flows_1.flujoCrypto,
        flows_1.flujoBienvenida,
        flows_1.flujoDolar,
        flows_1.flowTiempo,
    ]);
    createBot({
        flow: adapterFlow,
        provider: exports.adapterProvider,
        database: adapterDB,
    });
    // const BOTNAME = "BOTARDO";
    // QRPortalWeb({ name: BOTNAME, port: 3005 });
});
exports.chatBot = chatBot;
//Automatizar mensajes
// Configuración de la diferencia horaria para Argentina (GMT-3)
const timeZone = "America/Buenos_Aires";
// Programa la tarea para ejecutarse a las 08:00 AM (horario de Argentina)
cron.schedule("00 11 * * *", () => {
    (0, automatizedMessages_1.firstMessage)(usuarios);
}, { timeZone });
// Programa la tarea para ejecutarse a las 12:00 PM (horario de Argentina)
cron.schedule("00 15 * * *", () => {
    (0, automatizedMessages_1.secondMessage)(usuarios);
}, { timeZone });
// Programa la tarea para ejecutarse cada minuto (horario de Argentina)
cron.schedule("* * * * *", () => {
    (0, automatizedMessages_1.checkDolarChanges)(usuarios);
}, { timeZone });
