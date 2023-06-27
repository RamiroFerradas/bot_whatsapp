const obtenerMensajePersonalizadoDia = (temperaturaC) => {
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

const obtenerMensajeComoAbrigarse = (temperaturaC) => {
  const consejosCalor = [
    "🔥 Lleva ropa ligera y transpirable para mantenerte fresco.",
    "🧴 Aplica protector solar para protegerte de los rayos del sol.",
    "🧢 Usa un sombrero de ala ancha para proteger tu rostro del sol.",
    "🕶️ No olvides llevar gafas de sol para proteger tus ojos.",
    "🥤 Lleva una botella de agua para mantenerte hidratado durante el día.",
  ];

  const consejosAgradable = [
    "🧥 Lleva una chaqueta ligera por si la temperatura baja.",
    "👕 Viste en capas para poder ajustar tu vestimenta según el clima.",
    "👟 Elige calzado cómodo y adecuado para caminar al aire libre.",
    "🎒 Lleva una mochila con artículos esenciales para tu actividad al aire libre.",
    "🌂 Lleva un paraguas compacto por si hay posibilidad de lluvia.",
  ];

  const consejosFrio = [
    "🧣 Abrígate con bufandas, gorros y guantes para proteger las extremidades.",
    "🧥 Usa ropa térmica o de abrigo para mantener el calor corporal.",
    "🧦 Elige calcetines gruesos y calientes para mantener tus pies abrigados.",
    "🔥 Utiliza capas de ropa y asegúrate de llevar un abrigo resistente al frío.",
    "☕️ Lleva una taza térmica con una bebida caliente para reconfortarte.",
  ];

  let consejos = [];

  if (temperaturaC >= 25) {
    consejos = consejosCalor;
  } else if (temperaturaC >= 15) {
    consejos = consejosAgradable;
  } else {
    consejos = consejosFrio;
  }

  const indiceAleatorio = Math.floor(Math.random() * consejos.length);
  return consejos[indiceAleatorio];
};

const generarMessageClima = (name, city, region, temperaturaC) => {
  const mensajePersonalizado1 = obtenerMensajePersonalizadoDia(temperaturaC);
  const mensajePersonalizado2 = obtenerMensajeComoAbrigarse(temperaturaC);

  const message = `¡Hola ${name}! Aquí está el pronóstico actual para *${city}, ${region}*:
Temperatura: *${temperaturaC}°C*.
${mensajePersonalizado1}
${mensajePersonalizado2}`;

  return message;
};

module.exports = {
  obtenerMensajePersonalizadoDia,
  obtenerMensajeComoAbrigarse,
  generarMessageClima,
};
