import React, { FC, useState, createContext, useEffect, Children } from "react";
import { restuarantsRequest, restaurantsTransform } from "./RestaurantsService";

import {
  ChildrenType,
  RestaurantsType,
  RestaurantType,
} from "../../utils/types";

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

export const RestuarantsContext =
  createContext<contextValueType>(initContextValue);

export const RestuarantsContextProvider: FC<ChildrenType> = (props) => {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>(null);

  const fetchRestuarants = () => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const res = await restuarantsRequest();
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
    <RestuarantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {props.children}
    </RestuarantsContext.Provider>
  );
};
