require("dotenv").config();
const { HOST } = process.env;
const axios = require("axios");

const { getInfoDolar } = require("../services/getDolar");
const { getWeather } = require("../services/getWeather");
const { generarMessageClima } = require("../utils/mensajesPersonalizados");
const { getInfoCrypto } = require("../services/getBtc");

let lastDolarValues = null;
const checkDolarChanges = async (usuarios) => {
  let message = "";
  let hasChanges = false;
  try {
    const newDolarValues = await getInfoDolar();

    const dolarMessage = `Compra: *$${newDolarValues.compra}*\nVenta: *$${newDolarValues.venta}*.`;
    if (lastDolarValues) {
      // Compara los valores actuales con los anteriores
      if (newDolarValues.compra > lastDolarValues.compra) {
        message = `💸🚀 El dólar blue ha subido.\n
        ${dolarMessage}`;
        hasChanges = true;
      } else if (newDolarValues.compra < lastDolarValues.compra) {
        message = `⏬ Dólar blue ha bajado.\n
          ${dolarMessage}`;
        hasChanges = true;
      } else {
        message = "El valor del dólar blue se mantiene sin cambios.";
      }
    }
    if (hasChanges) {
      for (const usuario of usuarios) {
        await axios.post(`${HOST}/api/send-message-bot?id=${usuario.id}`, {
          message,
        });
      }
    }

    console.log(message);
    lastDolarValues = newDolarValues;
  } catch (error) {
    console.error(
      "Error al obtener información del servicio de DolarSi:",
      error.message
    );
  }
};

const firstMessage = async (usuarios) => {
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

      await axios.post(`${HOST}/api/send-message-bot?id=${id}`, {
        message,
      });
    }
  } catch (error) {
    console.error("Error al enviar la automatización:", error.message);
  }
};

const secondMessage = async (usuarios) => {
  const message = `¡Hola! Soy tu asistente automático. Estoy aquí para ayudarte con algunas consultas comunes:\n
- Si quieres saber el clima actual, simplemente pregúntame *¿Qué clima hace?* o cualquier variante relacionada como *¿Cómo está el día?* , *¿Hace calor?* , *¿Hace frío?* , *¿Cómo está afuera?* .\n
- Si estás interesado en el precio de Bitcoin (BTC), solo tienes que mencionar palabras clave como *btc* o *crypto*.\n
- Si deseas conocer el valor del dólar blue, solo pregúntame por *dólar* o *usd*.\n
¡Estoy aquí para brindarte información útil y responder a tus preguntas! Si necesitas algo más, no dudes en decírmelo. 😊`;

  try {
    for (const usuario of usuarios) {
      await axios.post(`${HOST}/api/send-message-bot?id=${usuario.id}`, {
        message,
      });
    }
  } catch (error) {
    console.error("Error al ejecutar la automatización:", error.message);
  }
};

module.exports = { checkDolarChanges, firstMessage, secondMessage };
