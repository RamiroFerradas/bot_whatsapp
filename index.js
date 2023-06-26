const express = require("express");
const fs = require("fs");
const { join } = require("path");
const { createReadStream } = require("fs");
const chatBot = require("./app");
require("dotenv").config();

const app = express();

// Endpoint GET para obtener todos los menús
app.get("/menus", (req, res) => {
  // Leer el archivo JSON con los menús
  fs.readFile("./menus.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al leer los menús" });
    }

    // Convertir el contenido del archivo JSON en un objeto JavaScript
    const menus = JSON.parse(data);

    // Devolver los menús en formato JSON
    res.json({ menus });
  });
});

// Puerto en el que se ejecutará el servidor
const port = 3001;

// Iniciar el servidor

const verificarAutenticacion = (req, res, next) => {
  const token = req.headers.authorization;

  // Verifica si el token es válido
  if (token === process.env.TOKEN) {
    next();
  } else {
    res.status(401).send("Acceso no autorizado");
  }
};

app.get("/get-qr", async (_, res) => {
  const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
  const fileStream = createReadStream(YOUR_PATH_QR);

  res.writeHead(200, { "Content-Type": "image/png" });
  fileStream.pipe(res);
});

app.listen(port, () => {
  chatBot();
  console.log(`Servidor escuchando en el puerto ${port}`);
});
