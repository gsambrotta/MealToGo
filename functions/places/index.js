const { mocks, addMockImages } = require("./mock");
const url = require("url");

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
  } else {
    restaurant.photos = [
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.API_GOOGLE}`,
    ];
  }

  return restaurant;
};

module.exports.placesRequest = (req, res, client) => {
  const { location, mock } = url.parse(req.url, true).query;

  if (mock === "true") {
    const data = mocks[location];
    if (data) {
      data.results = data.results.map(addMockImages);
    }
    res.json(data);
  }

  client
    .placesNearby({
      params: {
        location,
        radius: 1500, //15km - is set in meter
        key: process.env.API_GOOGLE,
      },
      timeout: 1000,
    })
    .then((response) => {
      response.data.results = response.data.results.map(addGoogleImage);
      return res.json(response.data);
    })
    .catch((err) => {
      res.status(400);
      return res.send(err);
    });
};
