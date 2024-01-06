const axios = require("axios");

const getCityLoc = async (city, username) => {
  const { data } = await axios.get(
    `https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`
  );
  // const { name, lat, lng } = await data.geonames[0];
  // console.log(lng, lat);
  return data.geonames[0];
};

module.exports = { getCityLoc };