const request = require("supertest");
const { getCityLoc } = require("./getCityLoc");

const requests = {
  body: {
    city: "london",
    username: "menoo20",
  },
};
it("GET City", () => {
  getCityLoc(requests);
});
