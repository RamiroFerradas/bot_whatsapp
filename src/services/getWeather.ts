const { WEATHER_API } = process.env;

export async function getWeather(ciudad: string) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=${ciudad}&aqi=no`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const temperaturaC = data.current.temp_c;
    const temperaturaF = data.current.temp_f;
    const city = data.location.name;
    const region = data.location.region;
    const clima = data.current.condition.text;

    return { temperaturaC, temperaturaF, city, region, clima };
  } catch (error: any) {
    console.log("Error al obtener los datos del clima:", error.message);

    const errorMessage =
      "Lo siento, no pude obtener los datos del clima en este momento. Por favor, intenta de nuevo más tarde.";

    return {
      body: errorMessage,
    };
  }
}
