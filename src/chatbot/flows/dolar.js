const { addKeyword } = require("@bot-whatsapp/bot");
const { getInfoDolar } = require("../../services/getDolar");
const { flujoAgradecimiento } = require("./agradecimiento");

const flujoDolar = addKeyword(["dolar", "usd", "dolar blue"]).addAnswer(
  `El precio actual del dolar bluees :`,
  null,
  async (ctx, { flowDynamic }) => {
    const dolarInfo = await getInfoDolar();
    const dolarMessage = `\nAdemás, te informo sobre el estado del dólar:\nCompra: *$${dolarInfo.compra}*\nVenta: *$${dolarInfo.venta}*.\n`;
    flowDynamic([{ body: dolarMessage }]);
  },
  // null,
  [flujoAgradecimiento]
);

module.exports = { flujoDolar };
