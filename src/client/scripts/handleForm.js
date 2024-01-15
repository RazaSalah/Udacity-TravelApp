import axios from "axios";
import { getDays } from "./getDays";

const form = document.querySelector("form");
const city = document.querySelector("#city");
const dateInput = document.querySelector("#date");
const city_error = document.querySelector("#city_error");
const date_error = document.querySelector("#date_error");

const handleSubmit = async (event) => {
  event.preventDefault();

  //validate the input before start fetching the data
  if (!validate_input()) {
    return;
  }

  // check if the function working or not
  // console.log("working");

  //   getting the city information form the first API
  const location = await getCity();

  if (location && location.error) {
    city_error.innerHTML = `${location.message}`;
    city_error.style.display = "block";
    return;
  } else if (location && !location.error) city_error.style.display = "none";
  const { name, lng, lat } = await location;

  // console.log(location);

  //   getting the date input value
  const date = dateInput.value;
  const RemainDays = getDays(date);
  //   console.log(RemainDays);

  //   after getting the city ifo , will use it to get the weather info form the second API
  const Weather = await getWeather(lng, lat, RemainDays);
  console.log(Weather);

  if (Weather && Weather.error) {
    date.innerHTML = `${Weather.message}`;
    date_error.style.display = "block";
    return;
  }
  date_error.style.display = "none";
  // get city picture

  const cityPic = await getCityPic(name);

  updateUI(RemainDays, Weather, cityPic.image, name);
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

// const getDays = (date) => {
//   // set the start and end days
//   const now = new Date();
//   const travelDate = new Date(date);

//   //   getting the remaining time and then converting the time into days
//   const timeDiff = travelDate.getTime() - now.getTime();
//   const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
//   //   console.log(remainingDays);

//   return remainingDays;
// };

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

const updateUI = (RemainDays, Weather, cityPic, name) => {
  document.querySelector(
    "#Rdays"
  ).innerHTML = `Your Trip starts in ${RemainDays} days from now`;

  document.querySelector(".cityName").innerHTML = `Location: ${name}`;

  document.querySelector(".weather").innerHTML =
    RemainDays > 7
      ? `Weather is ${Weather.description}`
      : `Weather is expected to be ${Weather.description}`;

  document.querySelector(".temp").innerHTML =
    RemainDays > 7
      ? `Forecast ${Weather.temp}&deg C`
      : `Temperature ${Weather.temp}&deg C`;

  document.querySelector(".max-temp").innerHTML =
    RemainDays > 7 ? `Max-Temp: ${Weather.app_max_temp}&degC` : " ";

  document.querySelector(".min-temp").innerHTML =
    RemainDays > 7 ? `Min-Temp: ${Weather.app_min_temp}&degC` : "";

  document.querySelector(".cityPic").innerHTML = `<img
   src="${cityPic}" 
   alt="an image that describes the city nature"
   >
   `;
  document.querySelector(".flight_data").style.display = "block";
};

// validate form input
const validate_input = () => {
  city_error.style.display = "none";
  date_error.style.display = "none";

  if (!city.value) {
    city_error.innerHTML = `<p>You need to enter a name of the city</p>`;
    city_error.style.display = "block";
    return;
  } else if (!date.value) {
    date_error.innerHTML = `<p>You need to enter a valid date</p>`;
    date_error.style.display = "block";
    return;
  } else if (getDays(date.value) < 0) {
    date_error.innerHTML = `<p>Date can't be in the past </p>`;
    date_error.style.display = "block";
    return;
  }
  return true;
};
// we need to export the function to index.js file
export { handleSubmit };
