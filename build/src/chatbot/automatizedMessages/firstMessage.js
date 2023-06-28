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
exports.firstMessage = void 0;
require("dotenv").config();
const axios = require("axios");
const services_1 = require("../../services");
const utils_1 = require("../../utils");
const firstMessage = (usuarios) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const usuario of usuarios) {
            const { id, nombre, ciudad } = usuario;
            const { city, region, temperaturaC, temperaturaF, clima } = yield (0, services_1.getWeather)(ciudad);
            const messageCLima = (0, utils_1.generarMessageClima)(nombre, city, region, temperaturaC);
            const dolarInfo = yield (0, services_1.getInfoDolar)();
            const cryptoInfo = yield (0, services_1.getInfoCrypto)("btc");
            const climaMessage = `${messageCLima}\n`;
            const dolarMessage = `\nAdemás, te informo sobre el estado del dólar:\nCompra: *$${dolarInfo.compra}*\nVenta: *$${dolarInfo.venta}*.\n`;
            const btcMessage = `\nEl precio actual de Bitcoin (BTC) es: *$${cryptoInfo.toLocaleString()} USD.*\n`;
            const message = `${climaMessage}${dolarMessage} ${btcMessage}¡Que tengas un excelente día!\n
      Si necesitas saber mis comandos escribe *ayuda*
      `;
            yield axios.post(`${process.env.HOST}/api/send-message-bot?id=${id}`, {
                message,
            });
        }
    }
    catch (error) {
        console.error("Error al enviar la automatización:", error.message);
    }
});
exports.firstMessage = firstMessage;
