import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import RestaurantsNavigation from "../../infrastructure/navigation/RestaurantsNavigation";
import { RestaurantsContextProvider } from "../../services/restaurants/RestaurantsContext";
import { LocationContextProvider } from "../../src/services/location/LocationContext";
import { FavouritesContextProvider } from "../../src/services/favourites/FavouritesContext";
import SettingsScreen from "../../features/restaurants/screens/SettingsScreen";
import MapScreen from "../../features/map/screens/MapScreen";
import { IconComp } from "../../components/Icon";

import { AppNavigationProp } from "../../utils/types";

const Tab = createBottomTabNavigator<AppNavigationProp>();

interface TabIconProps {
  RestaurantsNav: keyof typeof Ionicons.glyphMap;
  Settings: keyof typeof Ionicons.glyphMap;
  Map: keyof typeof Ionicons.glyphMap;
}

const TAB_ICON: TabIconProps = {
  RestaurantsNav: "fast-food-outline",
  Settings: "settings-outline",
  Map: "map",
};

const AppNavigator = () => {
  return (
    <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName: keyof typeof Ionicons.glyphMap =
            TAB_ICON[route.name as keyof TabIconProps];

          return <IconComp name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="RestaurantsNav" component={RestaurantsNavigation} />
      <Tab.Screen name="Map" component={MapScreen} />

      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
    </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
  );
};

export default AppNavigator;
