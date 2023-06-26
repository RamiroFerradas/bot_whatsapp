const { addKeyword } = require("@bot-whatsapp/bot");

const flujoAgradecimiento = addKeyword([
  "gracias",
  "adios",
  "saludos",
]).addAnswer("Hasta luego !");

module.exports = { flujoAgradecimiento };
