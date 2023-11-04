/**
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});

exports.geocode = onRequest((request, response) => {
  geocodeRequest(request, response, client);
});

exports.placesRequest = onRequest((request, response) => {
  placesRequest(request, response, client);
});
