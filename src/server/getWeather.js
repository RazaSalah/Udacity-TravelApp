const axios = require("axios");

const getWeather = async (lng, lat, RemainDays, weather_key) => {
  if (RemainDays > 0 && RemainDays < 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${weather_key}`
    );
    const { weather, temp } = data.data[0];
    const { description } = weather;
    const weather_data = { description, temp };
    return weather_data;
  } else if (RemainDays > 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${RemainDays}&key=${weather_key}`
    );
    console.log("weather more than 7 days ");
    const { app_max_temp, app_min_temp, weather, temp } =
      data.data[data.data.length - 1];
    const { description } = weather;
    weather_data = { description, app_max_temp, app_min_temp, temp };
    return weather_data;
  }
};

module.exports = {
  getWeather,
};
