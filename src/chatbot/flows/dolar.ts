import { ChatContext } from "../../models/ChatContext";
import { getInfoDolar } from "../../services";

var { addKeyword } = require("@bot-whatsapp/bot");
var { flujoAgradecimiento } = require("./agradecimiento");

export const flujoDolar = addKeyword(["dolar", "usd", "dolar blue"]).addAnswer(
  `El precio actual del dolar blue es :`,
  null,
  async (
    ctx: ChatContext,
    { flowDynamic }: { flowDynamic: (data: any) => void }
  ) => {
    const dolarInfo = await getInfoDolar();
    const dolarMessage = `Compra: *$${dolarInfo.compra}*\nVenta: *$${dolarInfo.venta}*.`;
    const data = [{ body: dolarMessage }];
    flowDynamic(data);
  },
  [flujoAgradecimiento]
);
