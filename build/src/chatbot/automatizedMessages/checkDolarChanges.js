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
exports.checkDolarChanges = void 0;
require("dotenv").config();
const axios = require("axios");
const services_1 = require("../../services");
let lastDolarValues = null;
const checkDolarChanges = (usuarios) => __awaiter(void 0, void 0, void 0, function* () {
    let message = "";
    let hasChanges = false;
    try {
        const newDolarValues = yield (0, services_1.getInfoDolar)();
        const dolarMessage = `Compra: *$${newDolarValues.compra}*\nVenta: *$${newDolarValues.venta}*.`;
        if (lastDolarValues) {
            // Compara los valores actuales con los anteriores
            if (newDolarValues.compra > lastDolarValues.compra) {
                message = `💸🚀 El dólar blue ha subido.\n
        ${dolarMessage}`;
                hasChanges = true;
            }
            else if (newDolarValues.compra < lastDolarValues.compra) {
                message = `⏬ Dólar blue ha bajado.\n
          ${dolarMessage}`;
                hasChanges = true;
            }
            else {
                message = "El valor del dólar blue se mantiene sin cambios.";
            }
        }
        if (hasChanges) {
            for (const usuario of usuarios) {
                yield axios.post(`${process.env.HOST}/api/send-message-bot?id=${usuario.id}`, {
                    message,
                });
            }
        }
        console.log(message);
        lastDolarValues = newDolarValues;
    }
    catch (error) {
        console.error("Error al obtener información del servicio de DolarSi:", error.message);
    }
});
exports.checkDolarChanges = checkDolarChanges;
