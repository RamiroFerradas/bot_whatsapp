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

// Utilizar la función
