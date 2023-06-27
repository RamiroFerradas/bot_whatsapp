const app = require("./src/app");
const { chatBot } = require("./src/chatbot/app");
const port = 3001;

// Start server
app.listen(port, () => {
  const whatsappText = "\x1b[32mWhatsApp\x1b[35m";
  const conexionExitosaTexto =
    "✨ \x1b[35m¡Conexión exitosa! El servidor está listo para brillar ✨\x1b[0m";

  console.log(`${conexionExitosaTexto}
🚀 Escuchando en el puerto: \x1b[33m${port}\x1b[0m`);

  chatBot()
    .then(() => {
      console.log(`🤖 Bot de ${whatsappText} \x1b[37mconectado\x1b[0m`);
    })
    .catch((error) => {
      console.error("Error al ejecutar chatBot:", error);
    });
});
const axios = require("axios");

function consumeAPI() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        {
          headers: {
            "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
          },
        }
      );

      // Obtener los datos de respuesta
      const json = response.data;

      // Imprimir los datos en la consola
      console.log(json);

      // Resolver la promesa con los datos
      resolve(json);
    } catch (ex) {
      // Manejar errores y rechazar la promesa
      console.error(ex);
      reject(ex);
    }
  });
}
