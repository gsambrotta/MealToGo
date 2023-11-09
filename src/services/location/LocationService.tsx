import camelize from "camelize-ts";
import { geometryType } from "../../utils/types";
import { hostGeocode } from "../../utils/env";

type resultType = {
  results: geometryType[];
};

const geoInit = {
  location: {
    lng: 0,
    lat: 0,
  },
  viewport: {
    northeast: {
      lat: 0,
      lng: 0,
    },
    southwest: {
      lat: 0,
      lng: 0,
    },
  },
};

export const locationRequest = (searchTerm: string) => {
  if (!searchTerm) return;

  const fetchData = async () => {
    try {
      const locationRes = await fetch(
        `${hostGeocode}?city=${searchTerm}&mock=${process.env.isMock}`
      );

      return locationRes.json();
    } catch (err) {
      console.error("error retriving city from firebase function");
    }
  };
  return fetchData();
};

export const locationTransform = ({ results }: resultType) => {
  if (results) {
    const camelizeResult = camelize(results);
    const { geometry = geoInit }: geometryType =
      camelizeResult[0 as keyof typeof camelize];
    const { lat, lng } = geometry.location;

    return { lat, lng, viewport: geometry.viewport };
  }
};
