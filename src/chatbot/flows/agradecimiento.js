const { addKeyword } = require("@bot-whatsapp/bot");

const flujoAgradecimiento = addKeyword([
  "gracias",
  "adios",
  "saludos",
  "gracias!",
  "chau",
]).addAnswer("Hasta luego !");

module.exports = { flujoAgradecimiento };
