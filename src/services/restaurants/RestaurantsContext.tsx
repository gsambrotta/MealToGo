import React, {
  FC,
  useState,
  createContext,
  useContext,
  useEffect,
} from "react";
import { restaurantsRequest, restaurantsTransform } from "./RestaurantsService";
import { LocationContext } from "../location/LocationContext";

import { ChildrenType, RestaurantType } from "../../utils/types";

type contextValueType = {
  restaurants: RestaurantType[];
  isLoading: boolean;
  error: string | unknown;
};

const initContextValue = {
  restaurants: [],
  isLoading: false,
  error: null,
};

export const RestaurantsContext =
  createContext<contextValueType>(initContextValue);

export const RestaurantsContextProvider: FC<ChildrenType> = (props) => {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>(null);
  const { location } = useContext(LocationContext);

  const fetchRestuarants = (loc: string) => {
    setIsLoading(true);
    setRestaurants([]);

    const fetchData = async () => {
      try {
        const res = await restaurantsRequest(loc);
        if (res) {
          // @ts-ignore
          setRestaurants(restaurantsTransform(res));
          setError(false);
          setIsLoading(false);
        }
      } catch (err) {
        console.log("fetch mocks err", err);
        setError(err);
        setIsLoading(false);
      }
    };
    fetchData();
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      fetchRestuarants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
