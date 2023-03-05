import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "./src/infrastructure/theme/ThemeProvider";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import RestuarantsScreen from "./src/features/restaurants/screens/RestaurantsScreen";

const App: React.FC = () => {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });
  const areFontsLoaded = oswaldLoaded && latoLoaded;

  if (!areFontsLoaded) return <></>;

  return (
    <ThemeProvider>
      <RestuarantsScreen />
      <StatusBar />
    </ThemeProvider>
  );
};

export default App;
