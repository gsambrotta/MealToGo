import { DefaultTheme } from "styled-components/native";

export interface ThemeType {
  theme: DefaultTheme;
}

export type AppNavigationProp = {
  RestaurantsNav: undefined;
  RestaurantsScreen: undefined;
  RestaurantDetailScreen: { restaurant: RestaurantType };
  Map: undefined;
  Settings: undefined;
};

export type AccountNavigationProp = {
  AccountScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type RestaurantType = {
  placeId: string;
  name: string;
  icon: string;
  photo: string[];
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
