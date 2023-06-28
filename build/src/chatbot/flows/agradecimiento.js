"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flujoAgradecimiento = void 0;
var { addKeyword } = require("@bot-whatsapp/bot");
exports.flujoAgradecimiento = addKeyword([
    "gracias",
    "adios",
    "saludos",
    "gracias!",
    "chau",
]).addAnswer("¡De nada! Ha sido un placer ayudarte. Que tengas un excelente día. 😊 ¡Hasta luego!");
