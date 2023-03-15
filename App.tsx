import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { ThemeProvider } from "./src/infrastructure/theme/ThemeProvider";
import { RestaurantsContextProvider } from "./src/services/restaurants/RestaurantsContext";
import { LocationContextProvider } from "./src/services/location/LocationContext";
import AppNavigator from "./src/infrastructure/navigation/AppNavigator";

const App: React.FC = () => {
  const [oswaldLoaded] = useOswald({ Oswald_400Regular });
  const [latoLoaded] = useLato({ Lato_400Regular });
  const areFontsLoaded = oswaldLoaded && latoLoaded;

  if (!areFontsLoaded) return <></>;

  return (
    <>
      <ThemeProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <AppNavigator />
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </ThemeProvider>
      <StatusBar />
    </>
  );
};

export default App;
