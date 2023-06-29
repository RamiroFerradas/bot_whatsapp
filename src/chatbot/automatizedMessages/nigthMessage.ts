import { User } from "../../models/User";

const axios = require("axios");
const { HOST } = process.env;

export const nigthMessage = async (usuarios: User[]) => {
  // Array de mensajes con iconos relacionados a la noche
  var mensajes = [
    "🌙 ¡Hola! Se acerca la medianoche, es hora de ir a descansar.",
    "⭐️ ¡Ya es tarde! Recuerda que descansar bien es importante para tu salud.",
    "🕛 El reloj marca casi las 12, es momento de ir a la cama y recargar energías.",
    "🌃 Está llegando la hora de ir a dormir, así que despídete del día con una sonrisa.",
    "💤 ¿Sabías que un buen descanso ayuda a mejorar la concentración? Es hora de ir a dormir.",
    "🌌 ¡Casi son las 12 de la noche! Relaja tu mente y prepárate para un buen descanso.",
    "🌜 El sueño es clave para una vida saludable. Hazte un favor y ve a dormir ahora.",
    "🌙 Recuerda que mañana te espera un nuevo día lleno de oportunidades. Vete a descansar.",
    "🌙 Es hora de dejar atrás las preocupaciones del día y permitir que el sueño renueve tu energía.",
    "🌟 Descansa bien esta noche y despertarás lleno/a de energía y listo/a para afrontar el día.",
  ];

  // Obtener un índice aleatorio
  var indiceAleatorio = Math.floor(Math.random() * mensajes.length);
  const message = mensajes[indiceAleatorio];

  try {
    for (const usuario of usuarios) {
      await axios.post(`${HOST}/api/send-message-bot?id=${usuario.id}`, {
        message,
      });
    }
  } catch (error: any) {
    console.error("Error al ejecutar la automatización:", error.message);
  }

  // Retornar un mensaje aleatorio
};
