const { addKeyword } = require("@bot-whatsapp/bot");
const { flujoAgradecimiento } = require("./agradecimiento");
const { getWeather } = require("../../services/getWeather");

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

    const mensajePersonalizado = obtenerMensajePersonalizadoClima(temperaturaC);

    const message = `¡Hola ${ctx.pushName}! Aquí está el pronóstico actual para ${city}, ${region}:
Temperatura: ${temperaturaC}°C
${mensajePersonalizado}
¡Que tengas un excelente día!`;

    flowDynamic({ body: message });
  },

  flujoAgradecimiento
);

const obtenerMensajePersonalizadoClima = (temperaturaC) => {
  const mensajesCalor = [
    "☀️ Disfruta del cálido clima al aire libre.",
    "🌞 ¡El sol está brillando! Aprovecha el día.",
    "🔥 Perfecto para ir a la playa y relajarse.",
    "🍹 El clima ideal para una refrescante bebida fría.",
    "🌴 ¡El verano ha llegado! Disfruta al máximo.",
    "🌞 Una excelente oportunidad para tomar el sol y disfrutar del calor.",
    "🍔 ¡El clima perfecto para una barbacoa al aire libre!",
    "⚽ Aprovecha el buen tiempo para practicar deportes al aire libre.",
    "🏊 Ideal para refrescarse en la piscina o el mar.",
    "🌳 ¡El clima te invita a pasar un día increíble al aire libre!",
  ];

  const mensajesAgradable = [
    "🌼 Aprovecha el clima agradable para realizar actividades al aire libre.",
    "🌸 Ideal para dar un paseo y disfrutar del entorno.",
    "🌳 ¡Qué hermoso día para disfrutar de la naturaleza!",
    "🧺 El clima perfecto para un picnic en el parque.",
    "🚶‍♀️ Disfruta de una caminata y descubre nuevos paisajes.",
    "🏡 Un día perfecto para relajarse en el jardín.",
    "🥗 El clima ideal para disfrutar de una terraza al aire libre.",
    "⚾ Una excelente oportunidad para practicar tu deporte favorito.",
    "👨‍👩‍👧‍👦 ¡Disfruta de un día agradable rodeado de amigos y familia!",
    "🍃 Aprovecha este clima para desconectar y relajarte.",
  ];

  const mensajesFrio = [
    "❄️ Afuera hace frío, asegúrate de abrigarte adecuadamente.",
    "🏠 Es un buen día para quedarse acogedor en casa.",
    "🧣 Recuerda llevar un abrigo para mantenerte abrigado.",
    "☕️ El clima invita a disfrutar de una taza de chocolate caliente.",
    "🔥 Perfecto para acurrucarse junto a la chimenea.",
    "🎥 Un día ideal para disfrutar de una película y una manta.",
    "🚶‍♂️ El clima perfecto para una caminata invernal.",
    "🧤 No olvides llevar un gorro y guantes para mantenerte abrigado.",
    "⛷️ Una excelente oportunidad para disfrutar de actividades de invierno.",
    "🍲 ¡El frío te invita a disfrutar de una comida caliente y reconfortante!",
  ];

  let mensajes = [];

  if (temperaturaC >= 25) {
    mensajes = mensajesCalor;
  } else if (temperaturaC >= 15) {
    mensajes = mensajesAgradable;
  } else {
    mensajes = mensajesFrio;
  }

  const indiceAleatorio = Math.floor(Math.random() * mensajes.length);
  return mensajes[indiceAleatorio];
};

module.exports = { flowClima };
