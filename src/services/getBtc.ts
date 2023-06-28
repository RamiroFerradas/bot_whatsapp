const axios = require("axios");
require("dotenv").config();
const { COINMARKETCAP_APIKEY, COINMARKETCAP_URL } = process.env;
export async function getInfoCrypto(symbol:string) {
  try {
    const response = await axios.get(COINMARKETCAP_URL, {
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_APIKEY,
        Accepts: "application/json",
      },
      params: {
        symbol: symbol.toUpperCase(),
      },
    });

    if (response.status === 200) {
      const data = response.data.data[symbol.toUpperCase()];
      if (data) {
        const precio = data.quote.USD.price;
        return precio;
      } else {
        console.log("No se encontró la criptomoneda especificada.");
        return null;
      }
    } else {
      console.log("Error al obtener el precio de la criptomoneda.");
      return null;
    }
  } catch (error:any) {
    console.log(
      "Error al realizar la solicitud a CoinMarketCap:",
      error.message
    );
    return null;
  }
}

