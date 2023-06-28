import { ChatContext } from "../../models/ChatContext";
import { Menu } from "../../models/Menu";

var { addKeyword } = require("@bot-whatsapp/bot");

const menusData = require("../menus.json");

export const flujoPedido = addKeyword(["pedir", "pedido"]);

export const flowPrincipal = addKeyword(["hola", "ole", "alo", "buenas"])
  .addAnswer("🙌 Hola bienvenido a *La Flamenca*")
  .addAnswer(
    [`Nuestro menu es`],
    null,
    (
      ctx: ChatContext,
      { flowDynamic }: { flowDynamic: (data: any) => void }
    ) => {
      const data = getMenuFormatted();
      setTimeout(() => {
        flowDynamic(data);
      }, 2000);
    }
  )
  .addAnswer("Escribe *Pedir* si te interesa algo", { delay: 1500 }, null, [
    flujoPedido,
  ]);

const getMenuFormatted = () => {
  const menuFormatted = menusData.map((m: Menu) => ({
    body: `*${m.nombre}:* ${m.descripcion}\n*Precio: ${m.precio}*`,
  }));
  console.log(menuFormatted);
  return menuFormatted;
};
