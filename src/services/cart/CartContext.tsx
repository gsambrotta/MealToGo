import React, {
  FC,
  useEffect,
  useContext,
  useState,
  createContext,
} from "react";
import { AuthenticationContext } from "../authentication/AuthenticationContext";
import { ChildrenType, RestaurantType } from "../../utils/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  sum: number;
};

const initContextValue = {
  restaurant: null,
  clearCart: () => {},
  addToCart: () => {},
  cart: [],
  sum: 0,
};

export const CartContext = createContext<contextValueType>(initContextValue);
export const CartContextProvider: FC<ChildrenType> = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const [cart, setCart] = useState<ItemType[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);

  const add = async (item: ItemType, rest: any) => {
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

  const saveCart = async (
    restaurant: RestaurantType | null,
    cart: ItemType[],
    uid: string
  ) => {
    try {
      const jsonValue = JSON.stringify({ restaurant, cart });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (error) {
      console.log("err storing cart localstorage", error);
    }
  };

  const loadCart = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`@cart-${uid}`);
      if (value !== null) {
        const { restaurant, cart } = JSON.parse(value);
        setRestaurant(restaurant);
        setCart(cart);
      }
    } catch (error) {
      console.log("err storing cart localstorage", error);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      loadCart(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (!cart.length) {
      return setSum(0);
    }

    const newSum = cart.reduce((acc, { price }) => {
      return (acc += Number(price));
    }, 0);
    setSum(newSum);
    if (user && user.uid) {
      saveCart(restaurant, cart, user.uid);
    }
  }, [restaurant, cart, user]);

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        restaurant,
        cart,
        sum,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

//// Official solution

// const saveCart = async (rst, crt, uid) => {
//   try {
//     const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
//     await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
//   } catch (e) {
//     console.log("error storing", e);
//   }
// };

// const loadCart = async (uid) => {
//   try {
//     const value = await AsyncStorage.getItem(`@cart-${uid}`);
//     if (value !== null) {
//       const { restaurant: rst, cart: crt } = JSON.parse(value);
//       setRestaurant(rst);
//       setCart(crt);
//     }
//   } catch (e) {
//     console.log("error storing", e);
//   }
// };

// useEffect(() => {
//   if (user && user.uid) {
//     loadCart(user.uid);
//   }
// }, [user]);

// useEffect(() => {
//   if (user && user.uid) {
//     saveCart(restaurant, cart, user.uid);
//   }
// }, [restaurant, cart, user]);
