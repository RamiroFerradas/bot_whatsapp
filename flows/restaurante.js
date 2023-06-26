const { addKeyword } = require("@bot-whatsapp/bot");

const menusData = require("../menus.json");

const flujoPedido = addKeyword(["pedir", "pedido"]);

const flowPrincipal = addKeyword(["hola", "ole", "alo", "buenas"])
  .addAnswer("🙌 Hola bienvenido a *La Flamenca*")
  .addAnswer([`Nuestro menu es`], null, (ctx, { flowDynamic }) => {
    const data = getMenuFormatted();
    setTimeout(() => {
      flowDynamic(data);
    }, 2000);
  })
  .addAnswer("Escribe *Pedir* si te interesa algo", { delay: 1500 }, null, [
    flujoPedido,
  ]);
const getMenuFormatted = () => {
  const menus = menusData;

  const menuFormatted = menus.map((m) => ({
    body: `*${m.nombre}:* ${m.descripcion}\n*Precio: ${m.precio}*`,
  }));
  return menuFormatted;
};

module.exports = { flowPrincipal };
