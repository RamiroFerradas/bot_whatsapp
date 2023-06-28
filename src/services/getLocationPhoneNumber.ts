const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.NUMVERIFY_APIKEY;

export async function obtenerInformacionTelefono(numeroTelefono: string) {
  const apiUrl = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${numeroTelefono}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("Error al llamar a la API de Numverify:", error);
    throw error;
  }
}
