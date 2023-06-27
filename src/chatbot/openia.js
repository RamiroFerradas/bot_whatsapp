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
console.log();
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

async function main() {
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
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Hello world",
    });
    console.log(completion.data.choices[0].text);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }

  // console.log(completion.data.choices[0].text);
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
