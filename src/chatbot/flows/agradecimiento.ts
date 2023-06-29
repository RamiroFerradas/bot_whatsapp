const { addKeyword } = require("@bot-whatsapp/bot");

export const flujoAgradecimiento = addKeyword([
  "gracias",
  "adios",
  "saludos",
  "gracias!",
  "chau",
]).addAnswer(
  "¡De nada! Ha sido un placer ayudarte. Que tengas un excelente día. 😊 ¡Hasta luego!"
);
