import { mocks } from "./mock";
import camelize from "camelize-ts";

export const restuarantsRequest = (
  location: string = "37.7749295,-122.4194155"
) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location as keyof typeof mocks];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant: { [key: string]: any }) => {
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours?.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });
  return camelize(mappedResults);
};

const fetchMockRest = async () => {
  try {
    const res = await restuarantsRequest();
    if (res) {
      console.log(restaurantsTransform(res));
    }
  } catch (err) {
    console.error("fetch mocks err", err);
  }
};

fetchMockRest();
