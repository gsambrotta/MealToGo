import React, {
  FC,
  useEffect,
  useContext,
  useState,
  createContext,
} from "react";
import { AuthenticationContext } from "../authentication/AuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChildrenType, RestaurantType } from "../../utils/types";

type ItemType = { item: string; price: string };
export type AddToCartFunction = (
  item: ItemType,
  restaurant: RestaurantType
) => void;

type contextValueType = {
  restaurant: RestaurantType | null;
  clearCart: () => void;
  addToCart: (item: ItemType, restaurant: RestaurantType) => void;
  cart: ItemType[];
};

const initContextValue = {
  restaurant: null,
  clearCart: () => {},
  addToCart: () => {},
  cart: [],
};

export const CartContext = createContext<contextValueType>(initContextValue);
export const CartContextProvider: FC<ChildrenType> = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState<ItemType[]>([]);
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);

  const add = (item: ItemType, rest: any) => {
    if (!restaurant || restaurant.placeId === rest.placeId) {
      setRestaurant(rest);
      setCart([item]);
      return;
    }

    setCart([...cart, item]);
  };
  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        restaurant,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
