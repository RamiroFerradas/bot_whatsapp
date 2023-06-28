const axios = require("axios");
require("dotenv").config();
const { HOST } = process.env;
import { User } from "../../models/User";

export const ramdomMessage = async (usuarios: User[]) => {
  const message = `Te venia a recordar que, te esta gorreando 👀. Saludos 😁`;

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
