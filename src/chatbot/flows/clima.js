const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoAgradecimiento } = require("./agradecimiento");
const { getWeather } = require("../../services/getWeather");
const { generarMessageClima } = require("../../utils/mensajesPersonalizados");
const {
  obtenerInformacionTelefono,
} = require("../../services/getLocationPhoneNumber");

const flowClima = addKeyword([`quiero saber el clima`, `clima`]).addAnswer(
  "🙌 Hola por favor indicame la *ciudad*",

  { capture: true },
  async (ctx, { flowDynamic }) => {
    const respuesta_del_usuario = ctx.body;

    const { city, region, temperaturaC, temperaturaF, clima } =
      await getWeather(respuesta_del_usuario);
    // console.log(ctx);
    // console.log(ctx.body);
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
const flowTiempo = addKeyword([
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
]).addAnswer(
  "Ya te digo...",
  null,
  async (ctx, { flowDynamic }) => {
    const { location } = await obtenerInformacionTelefono(ctx.from);

    const { city, region, temperaturaC, temperaturaF, clima } =
      await getWeather(location);
    // console.log(ctx);
    // console.log(ctx.body);
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

module.exports = { flowClima, flowTiempo };
