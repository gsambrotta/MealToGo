import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import RestaurantsNavigation from "../../infrastructure/navigation/RestaurantsNavigation";
import SettingsScreen from "../../features/restaurants/screens/SettingsScreen";
import MapScreen from "../../features/map/screens/MapScreen";
import { IconComp } from "../../components/Icon";

import { AppNavigationProp } from "../../utils/types";

const Tab = createBottomTabNavigator<AppNavigationProp>();

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

const AppNavigator = () => {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="Restaurants" component={RestaurantsNavigation} />
        <Tab.Screen name="Map" component={MapScreen} />

        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
