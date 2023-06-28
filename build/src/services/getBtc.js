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
exports.getInfoCrypto = void 0;
const axios = require("axios");
require("dotenv").config();
const { COINMARKETCAP_APIKEY, COINMARKETCAP_URL } = process.env;
function getInfoCrypto(symbol) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(COINMARKETCAP_URL, {
                headers: {
                    "X-CMC_PRO_API_KEY": COINMARKETCAP_APIKEY,
                    Accepts: "application/json",
                },
                params: {
                    symbol: symbol.toUpperCase(),
                },
            });
            if (response.status === 200) {
                const data = response.data.data[symbol.toUpperCase()];
                if (data) {
                    const precio = data.quote.USD.price;
                    return precio;
                }
                else {
                    console.log("No se encontró la criptomoneda especificada.");
                    return null;
                }
            }
            else {
                console.log("Error al obtener el precio de la criptomoneda.");
                return null;
            }
        }
        catch (error) {
            console.log("Error al realizar la solicitud a CoinMarketCap:", error.message);
            return null;
        }
    });
}
exports.getInfoCrypto = getInfoCrypto;
