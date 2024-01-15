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

module.exports = { getDays };
