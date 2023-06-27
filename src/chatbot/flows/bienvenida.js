const { addKeyword } = require("@bot-whatsapp/bot");

const mensajeFlujoBienvenida = `¡Hola! Soy tu asistente automático. Estoy aquí para ayudarte con algunas consultas comunes:

- Si quieres saber el clima actual, simplemente pregúntame "¿Qué clima hace?" o cualquier variante relacionada como "¿Cómo está el día?".
- Si estás interesado en el precio de las criptomonedas, como Bitcoin (BTC) o Ethereum (ETH), solo tienes que mencionar palabras clave como "btc" o "crypto".
- Si deseas conocer el valor del dólar, incluyendo el dolar blue, solo pregúntame por "dolar" o "usd".

¡Estoy aquí para brindarte información útil y responder a tus preguntas! Si necesitas algo más, no dudes en decírmelo. 😊`;

module.exports = { mensajeFlujoBienvenida };

const flujoBienvenida = addKeyword([
  "hola",
  "ayuda",
  "help",
  "buen dia",
]).addAnswer([
  `¡Hola! Soy tu asistente automático. Estoy aquí para ayudarte con algunas consultas comunes:`,

  `- Si quieres saber el clima actual, simplemente pregúntame *¿Qué clima hace*" o cualquier variante relacionada como *¿Cómo está el día?*, *¿Hace calor?*, *clima*.\n
  - Si estás interesado en el precio de las criptomonedas, como Bitcoin (BTC) o Ethereum (ETH), solo tienes que mencionar palabras clave como *btc* o *crypto*,\n
  - Si deseas conocer el valor del dólar, incluyendo el dolar blue, solo pregúntame por *dolar* o *usd*.\n`,

  `¡Estoy aquí para brindarte información útil y responder a tus preguntas! Si necesitas algo más, no dudes en decírmelo. 😊`,
]);

module.exports = { flujoBienvenida };
