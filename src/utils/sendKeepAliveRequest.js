const sendKeepAliveRequest = (url, min = 0) => {
  const time = min * 60 * 1000;

  setInterval(async () => {
    try {
      await fetch(`${url}/api/keep-alive`);
      console.log("Solicitud de mantenimiento enviada");
    } catch (error) {
      console.log(
        "Error al enviar la solicitud de mantenimiento",
        error.message
      );
      throw new Error("Error al enviar la solicitud de mantenimiento");
    }
  }, time);
};

module.exports = { sendKeepAliveRequest };
