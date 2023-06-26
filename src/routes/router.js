const express = require("express");
const fs = require("fs");
const { join } = require("path");
const { createReadStream } = require("fs");
const { verificarAutenticacion } = require("./auth");
const router = express.Router();

router.get("/menus", (req, res) => {
  // Leer el archivo JSON con los menús
  fs.readFile("../chatbot/menus.json", "utf8", (err, data) => {
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

// Middleware para verificar la autenticación

router.get("/get-qr", verificarAutenticacion, (req, res) => {
  const YOUR_PATH_QR = join(process.cwd(), `bot.qr.png`);
  const fileStream = createReadStream(YOUR_PATH_QR);

  res.writeHead(200, { "Content-Type": "image/png" });
  fileStream.pipe(res);
});

module.exports = router;
