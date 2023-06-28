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
exports.secondMessage = void 0;
const axios = require("axios");
require("dotenv").config();
const { HOST } = process.env;
const secondMessage = (usuarios) => __awaiter(void 0, void 0, void 0, function* () {
    const message = `¡Hola! Soy tu asistente automático. Estoy aquí para ayudarte con algunas consultas comunes:\n
- Si quieres saber el clima actual, simplemente pregúntame *¿Qué clima hace?* o cualquier variante relacionada como *¿Cómo está el día?* , *¿Hace calor?* , *¿Hace frío?* , *¿Cómo está afuera?* .\n
- Si estás interesado en el precio de Bitcoin (BTC), solo tienes que mencionar palabras clave como *btc* o *crypto*.\n
- Si deseas conocer el valor del dólar blue, solo pregúntame por *dólar* o *usd*.\n
¡Estoy aquí para brindarte información útil y responder a tus preguntas! Si necesitas algo más, no dudes en decírmelo. 😊`;
    try {
        for (const usuario of usuarios) {
            yield axios.post(`${HOST}/api/send-message-bot?id=${usuario.id}`, {
                message,
            });
        }
    }
    catch (error) {
        console.error("Error al ejecutar la automatización:", error.message);
    }
});
exports.secondMessage = secondMessage;
