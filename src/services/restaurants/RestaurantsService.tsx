import { mocks, mockImages } from "./mock";
import camelize from "camelize-ts";

export const restaurantsRequest = (location: string) => {
  if (!location) return;
  return new Promise((resolve, reject) => {
    const mock = mocks[location as keyof typeof mocks];
    if (!mock) {
      reject("not found");
    } else {
      resolve(mock);
    }
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant: { [key: string]: any }) => {
    const randomPhoto = restaurant.photos.map(() => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    const photosRemovedFalse = restaurant.photos[0].html_attributions.filter(
      (item: any) =>
        item.length > 0 &&
        typeof item !== (null || undefined || "boolean") &&
        item
    );

    restaurant.photo =
      photosRemovedFalse.length > 0
        ? restaurant.photos[0].html_attributions[0]
        : randomPhoto;

    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours?.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResults);
};
