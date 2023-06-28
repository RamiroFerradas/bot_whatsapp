"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
// async function example() {
//   const { ChatGPTAPI } = await import("chatgpt");
//   const api = new ChatGPTAPI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const res = await api.sendMessage("Hello World!");
//   console.log(res.text);
// }
// class ChatGPTClass extends CoreClass {
//   queue = [];
//   openai = undefined;
//   constructor(_database, _provider, _optionsGPT = {}) {
//     super(null, _database, _provider);
//     this.optionsGPT = {
//       ...this.optionsGPT,
//       ..._optionsGPT,
//     };
//     this.init().then();
//   }
//   async init() {
//     const { ChatGPTAPI } = await import("chatgpt");
//     this.openai = new ChatGPTAPI({
//       apiKey: process.env.API_KEY,
//     });
//   }
//   async handleMsg(ctx) {
//     const { from, body } = ctx;
//     // Código para manejar el mensaje
//   }
// }
const { Configuration, OpenAIApi } = require("openai");
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(process.env.API_KEY);
        // const openai = new OpenAiApi(configuration);
        // const completion = await openai.createCompletion({
        //   model: "text-davinci-003",
        //   prompt: "Cual es la capital de Alemania",
        // });
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        try {
            const completion = yield openai.createCompletion({
                model: "text-davinci-003",
                prompt: "Hello world",
            });
            console.log(completion.data.choices[0].text);
        }
        catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
            }
            else {
                console.log(error.message);
            }
        }
        // console.log(completion.data.choices[0].text);
    });
}
module.exports = { main };
// async function example() {
//   const api = new ChatGPTAPI({
//     apiKey: process.env.API_KEY,
//   });
//   const res = await api.sendMessage("Hello World!");
//   console.log(res.text);
// }
// example();
