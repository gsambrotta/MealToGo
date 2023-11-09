const { locations: locationsMock } = require("./geocodeMock");
const url = require("url");

module.exports.geocodeRequest = (req, res, client) => {
  const { city, mock } = url.parse(req.url, true).query;

  if (mock === "true") {
    const locationMock = locationsMock[city.toLowerCase()];
    res.send(JSON.stringify(locationMock));
  }

  client
    .geocode({
      params: {
        address: city,
        key: process.env.API_GOOGLE,
      },
      timeout: 1000,
    })
    .then((response) => {
      return res.json(response.data);
    })
    .catch((err) => {
      res.status(400);
      return res.send(err);
    });
};
