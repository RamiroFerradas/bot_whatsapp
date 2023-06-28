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
exports.flujoDolar = void 0;
const services_1 = require("../../services");
var { addKeyword } = require("@bot-whatsapp/bot");
var { flujoAgradecimiento } = require("./agradecimiento");
exports.flujoDolar = addKeyword(["dolar", "usd", "dolar blue"]).addAnswer(`El precio actual del dolar blue es :`, null, (ctx, { flowDynamic }) => __awaiter(void 0, void 0, void 0, function* () {
    const dolarInfo = yield (0, services_1.getInfoDolar)();
    const dolarMessage = `Compra: *$${dolarInfo.compra}*\nVenta: *$${dolarInfo.venta}*.`;
    const data = [{ body: dolarMessage }];
    flowDynamic(data);
}), [flujoAgradecimiento]);
