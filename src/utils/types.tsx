import { DefaultTheme } from "styled-components/native";

export interface ThemeProps {
  theme: DefaultTheme;
}

export type restuarantProp = {
  name: string;
  icon: string;
  photo: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
};
