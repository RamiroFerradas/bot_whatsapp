const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoAgradecimiento } = require("./agradecimiento");

const flowClima = addKeyword([
  "que clima hace",
  "clima",
  "temperatura",
  "como esta el dia",
  "hace calor",
  "hace frio",
  "como esta afuera",
]).addAnswer(
  "🙌 Hola por favor indicame la *ciudad*",

  { capture: true },

  async (ctx, { flowDynamic }) => {
    const respuesta_del_usuario = ctx.body;
    console.log(ctx);
    console.log(respuesta_del_usuario);
    const data = await obtenerTemperatura(respuesta_del_usuario);
    flowDynamic(data);
  },
  flujoAgradecimiento
);

async function obtenerTemperatura(ciudad) {
  const apiKey = "f9c5c210c45f45cd9dd133629232506";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${ciudad}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const temperaturaC = data.current.temp_c;
    const temperaturaF = data.current.temp_f;
    const city = data.location.name;
    const region = data.location.region;

    const message = `¡Hola! Aquí está el pronóstico actual para ${city}, ${region}:
Temperatura: ${temperaturaC}°C (${temperaturaF}°F)
Clima: ${data.current.condition.text}`;
    console.log(message);
    return [
      {
        body: message,
      },
    ];
  } catch (error) {
    console.log("Error al obtener los datos del clima:", error.message);

    const errorMessage =
      "Lo siento, no pude obtener los datos del clima en este momento. Por favor, intenta de nuevo más tarde.";

    return {
      body: errorMessage,
    };
  }
}

module.exports = { flowClima };
