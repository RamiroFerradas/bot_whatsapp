// require("dotenv").config();

// async function example() {
//   const { ChatGPTAPI } = await import("chatgpt");

//   const api = new ChatGPTAPI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

//   const res = await api.sendMessage("Hello World!");
//   console.log(res.text);
// }

// example();
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
//   init = async () => {
//     const { ChatGPTAPI } = await import("chatgpt");
//     this.openai = new ChatGPTAPI({
//       apiKey: process.env.API_KEY,
//     });
//   };

//   handleMsg = async (ctx) => {
//     const { from, body } = ctx;
//   };
// }

// const configuration = new Configuration({
//   apiKey: process.env.API_KEY,
// });

// const main = async () => {
//   console.log(apiKey);
//   const openai = new OpenAIApi(configuration);
//   const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "Cual es la capital de alemania",
//   });

//   console.log(completion.data.choices[0].text);
// };

// main();

// async function example() {
//   const api = new ChatGPTAPI({
//     apiKey: process.env.API_KEY,
//   });

//   const res = await api.sendMessage("Hello World!");
//   console.log(res.text);
// }
