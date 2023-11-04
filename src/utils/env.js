import { Platform } from "react-native";

const firebaseGeocodeProd = "https://geocode-axojyswcaq-uc.a.run.app";
const firebaseLocationProd = "https://placesrequest-axojyswcaq-uc.a.run.app";
const firebaseFuncDev = "http://0.0.0.0:5001/mealstogo-3b93d/us-central1";
const isDevelopment = process.env.NODE_ENV === "development";

export const isMock = true;
export const isAndroid = Platform.OS === "android";

// Android doesn't support http - cannot work on local

export const hostGeocode =
  !isDevelopment || isAndroid ? firebaseGeocodeProd : firebaseFuncDev;
export const hostLocation =
  !isDevelopment || isAndroid ? firebaseLocationProd : firebaseFuncDev;
