const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoAgradecimiento } = require("./agradecimiento");
const { getWeather } = require("../../services/getWeather");
const {
  obtenerMensajePersonalizadoDia,
  obtenerMensajeComoAbrigarse,
  generarMessageClima,
} = require("../../utils/mensajesPersonalizados");

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

    const { city, region, temperaturaC, temperaturaF, clima } =
      await getWeather(respuesta_del_usuario);
    console.log(ctx);
    const message = generarMessageClima(
      ctx.pushName,
      city,
      region,
      temperaturaC
    );

    flowDynamic({ body: message });
  },

  flujoAgradecimiento
);

module.exports = { flowClima };
