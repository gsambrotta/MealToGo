import React from "react";
// import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { theme } from "./src/infrastructure/theme/index";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import RestuarantsScreen from "./src/features/restaurants/screens/restaurants.screen";

export default function App() {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });
  const areFontsLoaded = oswaldLoaded && latoLoaded;

  if (!areFontsLoaded) return <></>;

  return (
    <ThemeProvider theme={theme}>
      <RestuarantsScreen />
      <StatusBar />
    </ThemeProvider>
  );
}
