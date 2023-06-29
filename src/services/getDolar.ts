import { formatNumber, getDateTime } from "../utils";

const convert = require("xml-js");
const axios = require("axios");

const { DOLARSI_URL } = process.env;

/**
 * @description Obtener un json parseado con los valores de dolarSi
 */

interface ParsedJson {
  [key: string]: any;
}

const parseJson = (xmlData: string): ParsedJson => {
  const json = convert.xml2json(xmlData, { compact: true, spaces: 4 });
  return JSON.parse(json) as ParsedJson;
};

export const getInfoDolar = async () => {
  try {
    const dataDolar = await axios.get(DOLARSI_URL);
    const data = parseJson(dataDolar.data);
    const valores = {
      fecha: getDateTime(),
      compra: formatNumber(data.cotiza.Dolar.casa380.compra._text),
      venta: formatNumber(data.cotiza.Dolar.casa380.venta._text),
    };

    return valores;
  } catch (e: any) {
    console.log(e.message);
    throw new Error("Error al obtener información del servicio de DolarSi");
  }
};
