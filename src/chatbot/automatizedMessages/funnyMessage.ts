import { User } from "../../models/User";
require("dotenv").config();
const { HOST } = process.env;
const axios = require("axios");

export const funnyMessage = async (usuarios: User[]) => {
  try {
    const jokes = await axios.get("https://api.chucknorris.io/jokes/random/10");
    const randomJoke =
      jokes.data[Math.floor(Math.random() * jokes.data.length)];

    const message = `😄 ${randomJoke.value} 😄`;
    console.log(message);
    // for (const usuario of usuarios) {
    //   await axios.post(`${HOST}/api/send-message-bot?id=${usuario.id}`, {
    //     message,
    //   });
    // }
  } catch (error: any) {
    console.error("Error al ejecutar la automatización:", error.message);
  }
};
