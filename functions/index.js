/**
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const { geocodeRequest } = require("./geocode");
const { placesRequest } = require("./places");
const { payRequest } = require("./pay");
const { Client } = require("@googlemaps/google-maps-services-js");
const stripeClient = require("stripe")(process.env.STRIPE_KEY);
const googleClient = new Client({});

exports.geocode = onRequest((request, response) => {
  geocodeRequest(request, response, googleClient);
});

exports.placesRequest = onRequest((request, response) => {
  placesRequest(request, response, googleClient);
});

exports.payRequest = onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});
