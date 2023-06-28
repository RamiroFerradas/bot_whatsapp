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
exports.getWeather = void 0;
const { WEATHER_API } = process.env;
function getWeather(ciudad) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=${ciudad}&aqi=no`;
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }
            const temperaturaC = data.current.temp_c;
            const temperaturaF = data.current.temp_f;
            const city = data.location.name;
            const region = data.location.region;
            const clima = data.current.condition.text;
            return { temperaturaC, temperaturaF, city, region, clima };
        }
        catch (error) {
            console.log("Error al obtener los datos del clima:", error.message);
            const errorMessage = "Lo siento, no pude obtener los datos del clima en este momento. Por favor, intenta de nuevo más tarde.";
            return {
                body: errorMessage,
            };
        }
    });
}
exports.getWeather = getWeather;
