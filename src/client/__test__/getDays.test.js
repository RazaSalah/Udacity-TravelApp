const { getDays } = require("../scripts/getDays");

// in order to test the remaining days , i have to but any future date and then run the test
const date = new Date();

test("give me the remaining days from now to travel day", () => {
  expect(getDays(date)).toBe(-0);
});
