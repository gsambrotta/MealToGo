import { DefaultTheme } from "styled-components/native";

export interface ThemeType {
  theme: DefaultTheme;
}

export type RestaurantavigationProp = {
  RestaurantsScreen: undefined;
  RestaurantDetailScreen: { restaurant: RestaurantType };
};

export type RestaurantType = {
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
