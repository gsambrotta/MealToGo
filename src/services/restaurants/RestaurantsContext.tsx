import React, { FC, useState, createContext, useEffect } from "react";
import { restaurantsRequest, restaurantsTransform } from "./RestaurantsService";

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

  const fetchRestuarants = () => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const res = await restaurantsRequest();
        if (res) {
          // @ts-ignore
          setRestaurants(restaurantsTransform(res));
          setIsLoading(false);
        }
      } catch (err) {
        console.error("fetch mocks err", err);
        setError(err);
      }
    }, 2000);
  };

  useEffect(() => {
    fetchRestuarants();
  }, []);

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
