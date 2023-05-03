import React, {
  FC,
  useState,
  createContext,
  useEffect,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/AuthenticationContext";

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
  const { user } = useContext(AuthenticationContext);

  const storeFavourites = async (
    value: [] | RestaurantType[],
    userId: string
  ) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@favourites-${userId}`, jsonValue);
    } catch (error) {
      console.log("err storing Fav localstorage", error);
    }
  };

  const getFavourites = async (userId: string) => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${userId}`);
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
    user && getFavourites(user.uid);
  }, [user]);

  useEffect(() => {
    user && storeFavourites(favourites, user.uid);
  }, [favourites, user]);

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
