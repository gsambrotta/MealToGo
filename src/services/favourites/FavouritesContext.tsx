import React, { FC, useState, createContext, useEffect } from "react";

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
