import { DefaultTheme } from "styled-components/native";

export interface ThemeType {
  theme: DefaultTheme;
}

export type AppNavigationProp = {
  Restaurants: undefined;
  RestaurantsScreen: undefined;
  RestaurantDetailScreen: { restaurant: RestaurantType };
  Map: undefined;
  MapScreen: undefined;
  CheckoutScreen: undefined;
  CheckoutErrorScreen: { error: string };
  CheckoutSuccessScreen: undefined;
  Checkout: undefined;
  Settings: undefined;
  FavouriteScreen: undefined;
};

export type AccountNavigationProp = {
  AccountScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type SettingsNavigationProp = {
  SettingsScreen: undefined;
  FavouriteScreen: undefined;
  CameraScreen: undefined;
};

export type CheckoutNavigationProp = {
  CheckoutScreen: undefined;
  CheckoutErrorScreen: undefined;
  CheckoutSuccessScreen: undefined;
};

export type RestaurantType = {
  placeId: string;
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

export type RestaurantPropType = {
  restaurant: RestaurantType;
};

export type RestaurantsType = {
  restaurants: RestaurantType[];
};

export type ChildrenType = {
  children?: React.ReactNode;
};

export type geometryType = {
  geometry: {
    location: {
      lng: number;
      lat: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
};

export type LocationType = {
  lng: number;
  lat: number;
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
};

export type SearchProps = {
  isFavouritesToggle: boolean;
  onFavouritesToggle: () => void;
};
