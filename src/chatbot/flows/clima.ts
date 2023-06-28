import { ChatContext } from "../../models/ChatContext";
import { getWeather } from "../../services";
import { generarMessageClima } from "../../utils";

var { addKeyword } = require("@bot-whatsapp/bot");
var { flujoAgradecimiento } = require("./agradecimiento");
const {
  obtenerInformacionTelefono,
} = require("../../services/getLocationPhoneNumber");

export const flowClima = addKeyword([
  `quiero saber el clima`,
  `clima`,
]).addAnswer(
  "🙌 Hola por favor indicame la *ciudad*",

  { capture: true },
  async (
    ctx: ChatContext,
    { flowDynamic }: { flowDynamic: (data: any) => void }
  ) => {
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
export const flowTiempo = addKeyword([
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
  async (
    ctx: ChatContext,
    { flowDynamic }: { flowDynamic: (data: any) => void }
  ) => {
    const { location } = await obtenerInformacionTelefono(ctx.from);

    const { city, region, temperaturaC, temperaturaF, clima } =
      await getWeather(location);
    console.log(ctx);
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
