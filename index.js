const app = require("./src/app");
const port = process.env.PORT || 3001;

// Start server
app.listen(port, () => {
  const boxWidth = 60;
  const boxHeight = 10;
  const message = `🌟 ¡Conexión exitosa! El servidor está listo para brillar ✨
\x1b[32m🚀 Escuchando en el puerto: ${port}\x1b[35m\x1b[0m
`;

  const horizontalLine = "═".repeat(boxWidth);
  const emptyLine = " ".repeat(boxWidth);
  const verticalPadding = Math.floor((boxHeight - 4) / 2);
  const topPadding = "║\n".repeat(verticalPadding);
  const bottomPadding = "\n" + "║\n".repeat(verticalPadding);

  const centeredMessageLines = message
    .split("\n")
    .map((line) => {
      const padding = " ".repeat((boxWidth - line.length) / 2);
      const paddedLine = `${padding}${line}${padding}`;
      const lineWithSpaces = paddedLine.padEnd(boxWidth, " ");
      return `║${lineWithSpaces}║`;
    })
    .join("\n");

  console.log(`\x1b[35m╔${horizontalLine}╗
${topPadding}${centeredMessageLines}${bottomPadding}\x1b[35m╚${horizontalLine}╝\x1b[0m`);
});
