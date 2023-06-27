const { addKeyword } = require("@bot-whatsapp/bot");
const { getInfoCrypto } = require("../../services/getBtc");
const { flujoAgradecimiento } = require("./agradecimiento");

const flujoCrypto = addKeyword(["btc", "eth", "crypto"]).addAnswer(
  `El precio actual de Bitcoin (BTC) es:`,
  null,
  async (ctx, { flowDynamic }) => {
    const cryptoInfo = await getInfoCrypto("btc");
    const btcMessage = `*$${cryptoInfo.toLocaleString()} USD.*`;
    flowDynamic([{ body: btcMessage }]);
  },
  // null,
  [flujoAgradecimiento]
);

module.exports = { flujoCrypto };
