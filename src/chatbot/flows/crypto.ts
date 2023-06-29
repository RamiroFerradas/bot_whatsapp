import { ChatContext } from "../../models/ChatContext";
import { getInfoCrypto } from "../../services";

const { addKeyword } = require("@bot-whatsapp/bot");

export const flujoCrypto = addKeyword(["btc", "eth", "crypto"]).addAnswer(
  `El precio actual de Bitcoin (BTC) es:`,
  null,
  async (
    ctx: ChatContext,
    { flowDynamic }: { flowDynamic: (data: any) => void }
  ) => {
    const cryptoInfo = await getInfoCrypto("btc");
    const btcMessage = `*$${cryptoInfo.toLocaleString()} USD.*`;
    const data = [{ body: btcMessage }];
    flowDynamic(data);
  }
);
