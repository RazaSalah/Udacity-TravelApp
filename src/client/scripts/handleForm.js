import axios from "axios";

const form = document.querySelector("form");
const city = document.querySelector("city");
const dateInput = document.querySelector("#date");

const handleSubmit = async (event) => {
  event.preventDefault();

  // check if the function working or not
  // console.log("working");

  //   getting the city information form the first API
  const location = await getCity();
  const { name, lng, lat } = location;
  // console.log(location);

  //   getting the date input value
  const date = dateInput.value;
  const RemainDays = getDays(date);
  //   console.log(RemainDays);

  //   after getting the city ifo , will use it to get the weather info form the second API
  const Weather = await getWeather(lng, lat, RemainDays);
  console.log(Weather);

  // get city picture

  const cityPic = getCityPic(name);
};

const getCity = async () => {
  // console.log("first");
  const { data } = await axios.post("http://localhost:8000/getCity", form, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(data);
  return data;
};

const getDays = (date) => {
  // set the start and end days
  const now = new Date();
  const travelDate = new Date(date);

  //   getting the remaining time and then converting the time into days
  const timeDiff = travelDate.getTime() - now.getTime();
  const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  //   console.log(remainingDays);

  return remainingDays;
};

const getWeather = async (lng, lat, RemainDays) => {
  const { data } = await axios.post("http://localhost:8000/getWeather", {
    lng,
    lat,
    RemainDays,
  });
  return data;
};

const getCityPic = async (name) => {
  const { data } = await axios.post("http://localhost:8000/getPic", { name });
  console.log(data);
  return data;
};

// we need to export the function to index.js file
export { handleSubmit };
