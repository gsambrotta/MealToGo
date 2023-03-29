import React, { FC, useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ChildrenType, RestaurantType } from "../../utils/types";

type contextValueType = {
  favourites: [] | RestaurantType[];
  addToFavourites: (restaurant: RestaurantType) => void;
  removeFromFavourites: (restaurant: RestaurantType) => void;
};

const initContextValue = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
};

export const FavouritesContext =
  createContext<contextValueType>(initContextValue);

export const FavouritesContextProvider: FC<ChildrenType> = (props) => {
  const [favourites, setFavourites] = useState<[] | RestaurantType[]>([]);

  const storeFavourites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favourites", jsonValue);
    } catch (error) {
      console.log("err storing Fav localstorage", error);
    }
  };

  const getFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favourites");
      // return jsonValue != null ? JSON.parse(jsonValue) : null;

      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (error) {
      console.log("err getting Fav localstorage", error);
    }
  };

  const add = (restaurant: RestaurantType) => {
    const favAdd = [...favourites, restaurant];
    setFavourites(favAdd);
  };

  const remove = (restaurant: RestaurantType) => {
    const newFavourites = favourites.filter(
      (fav) => fav.placeId !== restaurant.placeId
    );

    setFavourites(newFavourites);
  };

  useEffect(() => {
    getFavourites();
  }, []);

  useEffect(() => {
    storeFavourites(favourites);
  }, [favourites]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {props.children}
    </FavouritesContext.Provider>
  );
};
