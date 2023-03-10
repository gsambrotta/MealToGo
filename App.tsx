import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider } from "./src/infrastructure/theme/ThemeProvider";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import Ionicons from "@expo/vector-icons/Ionicons";

import RestaurantsScreen from "./src/features/restaurants/screens/RestaurantsScreen";
import SettingsScreen from "./src/features/restaurants/screens/SettingsScreen";
import MapScreen from "./src/features/restaurants/screens/MapScreen";
import { IconComp } from "./src/components/Icon";
import { RestaurantsContextProvider } from "./src/services/restaurants/RestaurantsContext";
import { LocationContextProvider } from "./src/services/location/LocationContext";

const Tab = createBottomTabNavigator();

interface TabIconProps {
  Restaurants: keyof typeof Ionicons.glyphMap;
  Settings: keyof typeof Ionicons.glyphMap;
  Map: keyof typeof Ionicons.glyphMap;
}

const TAB_ICON: TabIconProps = {
  Restaurants: "fast-food-outline",
  Settings: "settings-outline",
  Map: "map",
};

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
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    const iconName: keyof typeof Ionicons.glyphMap =
                      TAB_ICON[route.name as keyof TabIconProps];

                    return (
                      <IconComp name={iconName} size={size} color={color} />
                    );
                  },
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                })}
              >
                <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
                <Tab.Screen name="Map" component={MapScreen} />

                <Tab.Screen name="Settings" component={SettingsScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </ThemeProvider>
      <StatusBar />
    </>
  );
};

export default App;
