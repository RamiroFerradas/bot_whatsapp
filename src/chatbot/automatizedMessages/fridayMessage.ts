import axios from "axios";
import { User } from "../../models/User";

const { HOST } = process.env;

const getDaysUntilFriday = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0: domingo, 1: lunes, ..., 6: sábado
  const daysUntilFriday =
    currentDay <= 5 ? 5 - currentDay : 6 + (5 - currentDay); // 5: viernes

  return daysUntilFriday;
};

export const fridayMessage = async (usuarios: User[]) => {
  const dayOfWeek = new Date().getDay();
  const daysUntilFriday = getDaysUntilFriday();

  let message = "";

  switch (dayOfWeek) {
    case 0: // Domingo
      message = `¡Feliz domingo! Solo faltan ${daysUntilFriday} día(s) para el viernes. ¡Mantén la motivación alta y disfruta del día! 💪😃`;
      break;
    case 1: // Lunes
      message = `¡Ánimo, es lunes! Solo quedan ${daysUntilFriday} día(s) para el viernes. ¡Sigue adelante con determinación! 💪😄`;
      break;
    case 2: // Martes
      message = `¡Buen martes! Quedan ${daysUntilFriday} día(s) para el viernes. ¡No pierdas de vista tus metas y sigue dando lo mejor! 🌟😊`;
      break;
    case 3: // Miércoles
      message = `¡Mitad de semana! Quedan ${daysUntilFriday} día(s) para el viernes. ¡Sigue esforzándote y verás grandes resultados! ✨😁`;
      break;
    case 4: // Jueves
      message = `¡Ya es jueves! Solo falta ${daysUntilFriday} día(s) para el viernes. ¡Mantén el enfoque y disfruta del proceso! 💫😃`;
      break;
    case 5: // Viernes
      message =
        "¡Por fin es viernes! Disfruta el día y prepárate para un merecido descanso el fin de semana. 🎉😄";
      break;
    case 6: // Sábado
      message =
        "¡Feliz sábado! Aprovecha el día para hacer lo que más te gusta y disfrutar al máximo. ¡Diviértete! 🌞😃";
      break;
    default:
      message =
        "¡Ánimo! Sigue adelante con determinación y mantén la motivación alta. 💪";
  }
  try {
    for (const usuario of usuarios) {
      await axios.post(`${HOST}/api/send-message-bot?id=${usuario.id}`, {
        message,
      });
    }
  } catch (error: any) {
    console.error(
      console.error("Error al ejecutar la automatización:", error.message)
    );
  }
  return message;
};
