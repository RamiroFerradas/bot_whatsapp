require("dotenv").config();
const axios = require("axios");
import { User } from "../../models/User";
import { getInfoDolar } from "../../services";

let lastDolarValues: any = null;
export const checkDolarChanges = async (usuarios: User[]) => {
  let message = "";
  let hasChanges = false;
  try {
    const newDolarValues = await getInfoDolar();

    const dolarMessage = `Compra: *$${newDolarValues.compra}*\nVenta: *$${newDolarValues.venta}*.`;
    if (lastDolarValues) {
      // Compara los valores actuales con los anteriores
      if (newDolarValues.compra > lastDolarValues.compra) {
        message = `💸🚀 El dólar blue ha subido.\n
        ${dolarMessage}`;
        hasChanges = true;
      } else if (newDolarValues.compra < lastDolarValues.compra) {
        message = `⏬ Dólar blue ha bajado.\n
          ${dolarMessage}`;
        hasChanges = true;
      } else {
        message = "El valor del dólar blue se mantiene sin cambios.";
      }
    }
    if (hasChanges) {
      for (const usuario of usuarios) {
        await axios.post(
          `${process.env.HOST}/api/send-message-bot?id=${usuario.id}`,
          {
            message,
          }
        );
      }
    }

    console.log(message);
    lastDolarValues = newDolarValues;
  } catch (error: any) {
    console.error(
      "Error al obtener información del servicio de DolarSi:",
      error.message
    );
  }
};
