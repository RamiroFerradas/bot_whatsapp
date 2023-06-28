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
exports.flowTiempo = exports.flowClima = void 0;
const services_1 = require("../../services");
const utils_1 = require("../../utils");
const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoAgradecimiento } = require("./agradecimiento");
const { obtenerInformacionTelefono, } = require("../../services/getLocationPhoneNumber");
exports.flowClima = addKeyword([
    `quiero saber el clima`,
    `clima`,
]).addAnswer("🙌 Hola por favor indicame la *ciudad*", { capture: true }, (ctx, { flowDynamic }) => __awaiter(void 0, void 0, void 0, function* () {
    const respuesta_del_usuario = ctx.body;
    const { city, region, temperaturaC, temperaturaF, clima } = yield (0, services_1.getWeather)(respuesta_del_usuario);
    // console.log(ctx);
    // console.log(ctx.body);
    const message = (0, utils_1.generarMessageClima)(ctx.pushName, city, region, temperaturaC);
    flowDynamic({ body: message });
}), flujoAgradecimiento);
exports.flowTiempo = addKeyword([
    "que clima hace",
    "temperatura",
    "como esta el dia",
    "hace calor",
    "hace frio",
    "como esta afuera",
    "que clima hace?",
    "temperatura?",
    "como esta el dia?",
    "hace calor?",
    "hace frio?",
    "como esta afuera?",
]).addAnswer("Ya te digo...", null, (ctx, { flowDynamic }) => __awaiter(void 0, void 0, void 0, function* () {
    const { location } = yield obtenerInformacionTelefono(ctx.from);
    const { city, region, temperaturaC, temperaturaF, clima } = yield (0, services_1.getWeather)(location);
    console.log(ctx);
    // console.log(ctx.body);
    const message = (0, utils_1.generarMessageClima)(ctx.pushName, city, region, temperaturaC);
    flowDynamic({ body: message });
}), flujoAgradecimiento);
