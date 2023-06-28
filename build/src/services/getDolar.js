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
exports.getInfoDolar = void 0;
const utils_1 = require("../utils");
require("dotenv").config();
const convert = require("xml-js");
const axios = require("axios");
const { DOLARSI_URL } = process.env;
const parseJson = (xmlData) => {
    const json = convert.xml2json(xmlData, { compact: true, spaces: 4 });
    return JSON.parse(json);
};
const getInfoDolar = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataDolar = yield axios.get(DOLARSI_URL);
        const data = parseJson(dataDolar.data);
        const valores = {
            fecha: (0, utils_1.getDateTime)(),
            compra: (0, utils_1.formatNumber)(data.cotiza.Dolar.casa380.compra._text),
            venta: (0, utils_1.formatNumber)(data.cotiza.Dolar.casa380.venta._text),
        };
        return valores;
    }
    catch (e) {
        console.log(e.message);
        throw new Error("Error al obtener información del servicio de DolarSi");
    }
});
exports.getInfoDolar = getInfoDolar;
