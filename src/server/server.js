const express = require("express");
const app = express();
const cors = require("cors");
// const dotenv = require("dotenv").config;

// import functions
const { getCityLoc } = require("./getCityLoc");

//read the json files coming to you
app.use(express.json());
app.use(express.static("dist"));

//require dotenv
require("dotenv").config();

//using cors
app.use(cors());

// port number
port = 8000;

const userstring = process.env.USER;
const usernumber = process.env.USERNUMBER;
const username = userstring.concat(usernumber);
console.log(username);

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
  console.log("weather");
  const { lng, lat, RemainDays } = req.body;
  console.log(req.body);
  // const city = req.body.city;
  // const Location = await getCityLoc(city, username);
  // console.log(Location);
  // return res.send(Location);
});

app.listen(8000, () => console.log(`server is listening on port ${port}`));
