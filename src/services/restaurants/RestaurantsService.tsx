import { mocks } from "./mock";
import { camalize } from "../../utils/camelcase";

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

const fetchMockRest = async () => {
  try {
    const res = await restuarantsRequest();
    if (res) {
      console.log(camalize(res));
    }
  } catch (err) {
    console.error("fetch mocks err", err);
  }
};

fetchMockRest();
