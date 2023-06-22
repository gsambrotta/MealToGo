import camelize from "camelize-ts";
import { host } from "../../utils/env";

export const restaurantsRequest = (location: string) => {
  if (!location) return;

  const fetchData = async () => {
    try {
      const locationRes = await fetch(
        `${host}/placesRequest?location=${location}`
      );

      return locationRes.json();
    } catch (err) {
      console.error("errore retrievig location from firebase functions");
    }
  };
  return fetchData();
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant: { [key: string]: any }) => {
    // const randomPhoto = restaurant.photos.map(() => {
    //   return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    // });

    // const photosRemovedFalse = restaurant.photos[0].html_attributions.filter(
    //   (item: any) =>
    //     item.length > 0 &&
    //     typeof item !== (null || undefined || "boolean") &&
    //     item
    // );

    // restaurant.photo =
    //   photosRemovedFalse.length > 0
    //     ? restaurant.photos[0].html_attributions[0]
    //     : randomPhoto;

    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours?.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResults);
};
