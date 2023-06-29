import { flujoAgradecimiento } from "./agradecimiento";

const { addKeyword } = require("@bot-whatsapp/bot");

export const mensajeFlujoBienvenida = `¡Hola! Soy tu asistente automático. Estoy aquí para ayudarte con algunas consultas comunes:

- Si quieres saber el clima actual, simplemente pregúntame "¿Qué clima hace?" o cualquier variante relacionada como "¿Cómo está el día?".
- Si estás interesado en el precio de las criptomonedas, como Bitcoin (BTC) o Ethereum (ETH), solo tienes que mencionar palabras clave como "btc" o "crypto".
- Si deseas conocer el valor del dólar, incluyendo el dolar blue, solo pregúntame por "dolar" o "usd".

¡Estoy aquí para brindarte información útil y responder a tus preguntas! Si necesitas algo más, no dudes en decírmelo. 😊`;

export const flujoBienvenida = addKeyword([
  "hola",
  "ayuda",
  "help",
  "buen dia",
]).addAnswer(
  [
    `¡Hola! Soy soy *BOTARDO* tu asistente automático. Estoy aquí para ayudarte con algunas consultas comunes:\n`,
    `- Si quieres saber el clima actual, simplemente pregúntame *¿Qué clima hace*" o cualquier variante relacionada como *¿Cómo está el día?* , *¿Hace calor?* , *¿Hace frio?* , *¿Como esta afuera?* .\n
    - Si quieres saber el clima actual, de una ciudad especifica simplemente escribeme *clima*,\n
    - Si estás interesado en el precio de Bitcoin (BTC), solo tienes que mencionar palabras clave como *btc* o *crypto*,\n
    - Si deseas conocer el valor del dolar blue, solo pregúntame por *dolar* o *usd*,\n
    - Si deseas conocer el mi creador, solo pregúntame por *creador* o *Quien te creo?*.\n`,
    `¡Estoy aquí para brindarte información útil y responder a tus preguntas! Si necesitas algo más, no dudes en decírmelo. 😊`,
  ],
  null,
  null,
  flujoAgradecimiento
);

// module.exports = { mensajeFlujoBienvenida };
