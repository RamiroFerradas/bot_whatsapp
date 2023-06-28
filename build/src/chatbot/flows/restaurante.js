"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowPrincipal = exports.flujoPedido = void 0;
var { addKeyword } = require("@bot-whatsapp/bot");
const menusData = require("../../json/menus.json");
exports.flujoPedido = addKeyword(["pedir", "pedido"]);
exports.flowPrincipal = addKeyword(["hola", "ole", "alo", "buenas"])
    .addAnswer("🙌 Hola bienvenido a *La Flamenca*")
    .addAnswer([`Nuestro menu es`], null, (ctx, { flowDynamic }) => {
    const data = getMenuFormatted();
    setTimeout(() => {
        flowDynamic(data);
    }, 2000);
})
    .addAnswer("Escribe *Pedir* si te interesa algo", { delay: 1500 }, null, [
    exports.flujoPedido,
]);
const getMenuFormatted = () => {
    const menuFormatted = menusData.map((m) => ({
        body: `*${m.nombre}:* ${m.descripcion}\n*Precio: ${m.precio}*`,
    }));
    console.log(menuFormatted);
    return menuFormatted;
};
