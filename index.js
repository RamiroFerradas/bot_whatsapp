const express = require("express");
const chatBot = require("./src/chatbot/app");
const router = require("./src/routes/router");

const app = express();
const port = 3001;

app.use(router);

app.listen(port, () => {
  chatBot();
  console.log(`Servidor escuchando en el puerto ${port}`);
});
