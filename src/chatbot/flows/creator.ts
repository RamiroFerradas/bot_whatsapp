const { addKeyword } = require("@bot-whatsapp/bot");

export const flujoCreador = addKeyword([
  "creador",
  "quien es tu creador",
  "quien es tu creador ?",
  "quien te creó?",
  "quien te creó ?",
]).addAnswer(
  "¡Sorpresa! Ramiro Ferradas es el genio detrás de mi existencia digital. Es la mente brillante que me creó y me dotó de mi toque de humor peculiar. Gracias a su creatividad, ahora puedo intentar sacarte una sonrisa de vez en cuando. Así que, si alguna vez te arranco una carcajada, recuerda que Ramiro merece un aplauso virtual por su contribución cómica. ¡Gracias, Ramiro, por hacerme tan divertido!. Alla la estan haciendo divertir tambien 😄👏"
);
