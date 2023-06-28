require("dotenv").config();
const axios = require("axios");

import { User } from "../../models/User";
import { getInfoCrypto, getInfoDolar, getWeather } from "../../services";
import { generarMessageClima } from "../../utils";

export const firstMessage = async (usuarios: User[]) => {
  try {
    for (const usuario of usuarios) {
      const { id, nombre, ciudad } = usuario;

      const { city, region, temperaturaC, temperaturaF, clima } =
        await getWeather(ciudad);
      const messageCLima = generarMessageClima(
        nombre,
        city,
        region,
        temperaturaC
      );

      const dolarInfo = await getInfoDolar();
      const cryptoInfo = await getInfoCrypto("btc");
      const climaMessage = `${messageCLima}\n`;
      const dolarMessage = `\nAdemás, te informo sobre el estado del dólar:\nCompra: *$${dolarInfo.compra}*\nVenta: *$${dolarInfo.venta}*.\n`;
      const btcMessage = `\nEl precio actual de Bitcoin (BTC) es: *$${cryptoInfo.toLocaleString()} USD.*\n`;

      const message = `${climaMessage}${dolarMessage} ${btcMessage}¡Que tengas un excelente día!\n
      Si necesitas saber mis comandos escribe *ayuda*
      `;

      await axios.post(`${process.env.HOST}/api/send-message-bot?id=${id}`, {
        message,
      });
    }
  } catch (error: any) {
    console.error("Error al enviar la automatización:", error.message);
  }
};
