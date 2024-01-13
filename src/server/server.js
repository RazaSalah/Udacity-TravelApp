const express = require("express");
const app = express();
const cors = require("cors");
// const dotenv = require("dotenv").config;

// import functions
const { getCityLoc } = require("./getCityLoc");
const { getWeather } = require("./getWeather");
const { getCityPic } = require("./getCityPic");

//read the json files coming to you
app.use(express.json());
app.use(express.static("dist"));

//require dotenv
require("dotenv").config();

//using cors
app.use(cors());

// port number
port = 8000;

// getting the keys value from env file
const userstring = process.env.USER;
const usernumber = process.env.USERNUMBER;
const username = userstring.concat(usernumber);
//console.log(username);

const weather_key = process.env.WEATHERKEY;
console.log(weather_key);
const pic_key = process.env.PIXAKEY;
console.log(pic_key);

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/getCity", async (req, res) => {
  // console.log("posted");
  // console.log(req.body);
  const city = req.body.city;
  const Location = await getCityLoc(city, username);
  // console.log(Location);
  return res.send(Location);
});

app.post("/getWeather", async (req, res) => {
  const { lng, lat, RemainDays } = req.body;
  const weather = await getWeather(lng, lat, RemainDays, weather_key);
  //console.log(weather);
  // console.log(req.body);
  return res.send(weather);
});

app.post("/getPic", async (req, res) => {
  const { name } = req.body;
  console.log(name);
  const picture = await getCityPic(name, pic_key);
  return res.send(picture);
});

app.listen(8000, () => console.log(`server is listening on port ${port}`));
