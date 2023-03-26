import { locations } from "./locationMock";
import camelize from "camelize-ts";
import { geometryType } from "../../utils/types";

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
  return new Promise((resolve, reject) => {
    const mockLocation = locations[searchTerm as keyof typeof locations];
    if (!mockLocation) {
      reject("not found");
    } else {
      resolve(mockLocation);
    }
  });
};

export const locationTransform = ({ results }: resultType) => {
  const camelizeResult = camelize(results);
  const { geometry = geoInit }: geometryType =
    camelizeResult[0 as keyof typeof camelize];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
