const { formatNumber } = require("./formatNumber");
const { getDateTime } = require("./getDateTime");

const getEvolucion = (evolucionAnual) => {
  const now = new Date();
  const mesActual = now.getMonth() + 1;

  let meses = [];
  for (let i = 1; i <= Object.keys(evolucionAnual).length; i++) {
    meses.push({
      anio: (i < mesActual
        ? now.getFullYear()
        : now.getFullYear() - 1
      ).toString(),
      mes: i.toString(),
      valor: formatNumber(
        evolucionAnual[[Object.keys(evolucionAnual)[i - 1]]]._text
      ).toString(),
    });
  }
  meses = meses.sort((a, b) => a.anio - b.anio);

  const valores = {
    fecha: getDateTime(),
    meses,
  };

  return valores;
};

module.exports = { getEvolucion };
