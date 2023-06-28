const axios = require("axios");
require("dotenv").config();
const { HOST } = process.env;
import { User } from "../../models/User";

export const secondMessage = async (usuarios: User[]) => {
  const message = `¡Hola! Soy tu asistente automático. Estoy aquí para ayudarte con algunas consultas comunes:\n
- Si quieres saber el clima actual, simplemente pregúntame *¿Qué clima hace?* o cualquier variante relacionada como *¿Cómo está el día?* , *¿Hace calor?* , *¿Hace frío?* , *¿Cómo está afuera?* .\n
- Si estás interesado en el precio de Bitcoin (BTC), solo tienes que mencionar palabras clave como *btc* o *crypto*.\n
- Si deseas conocer el valor del dólar blue, solo pregúntame por *dólar* o *usd*.\n
¡Estoy aquí para brindarte información útil y responder a tus preguntas! Si necesitas algo más, no dudes en decírmelo. 😊`;

  try {
    for (const usuario of usuarios) {
      await axios.post(`${HOST}/api/send-message-bot?id=${usuario.id}`, {
        message,
      });
    }
  } catch (error: any) {
    console.error("Error al ejecutar la automatización:", error.message);
  }
};
