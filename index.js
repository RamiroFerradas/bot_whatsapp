const express = require("express");
const fs = require("fs");
const chatBot = require("./app");
// const { chatBot } = require("./src/app");
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
app.listen(port, () => {
  chatBot();
  console.log(`Servidor escuchando en el puerto ${port}`);
});
