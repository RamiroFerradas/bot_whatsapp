const { addKeyword } = require("@bot-whatsapp/bot");
const { getInfoDolar } = require("../../services/getDolar");
const { flujoAgradecimiento } = require("./agradecimiento");

const flujoDolar = addKeyword(["dolar", "usd", "dolar blue"]).addAnswer(
  `El precio actual del dolar blue es :`,
  null,
  async (ctx, { flowDynamic }) => {
    const dolarInfo = await getInfoDolar();
    const dolarMessage = `Compra: *$${dolarInfo.compra}*\nVenta: *$${dolarInfo.venta}*.`;
    flowDynamic([{ body: dolarMessage }]);
  },
  // null,
  [flujoAgradecimiento]
);

module.exports = { flujoDolar };
