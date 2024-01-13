const axios = require("axios");

const getCityPic = async (name, key) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=${key}&q=${name}&image_type=photo`
  );

  //   if true display the web url image from the api otherwise display the image from unsplash
  const image = (await data.hits[0])
    ? await data.hits[0].webformatURL
    : "https://source.unsplash.com/random/640x480?city,morning,nigh?sig=1";
  console.log(image);
  if (image) {
    return { image };
  }
};

module.exports = { getCityPic };
