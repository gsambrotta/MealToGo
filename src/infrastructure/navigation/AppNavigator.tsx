import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import RestaurantsNavigation from "../../infrastructure/navigation/RestaurantsNavigation";
import SettingsNavigator from "../../infrastructure/navigation/SettingsNavigator";
import { RestaurantsContextProvider } from "../../services/restaurants/RestaurantsContext";
import { LocationContextProvider } from "../../services/location/LocationContext";
import { FavouritesContextProvider } from "../../services/favourites/FavouritesContext";
import { CartContextProvider } from "../../services/cart/CartContext";

import MapScreen from "../../features/map/screens/MapScreen";
import CheckoutScreen from "../../features/checkout/screens/CheckoutScreen";
import { IconComp } from "../../components/Icon";

import { AppNavigationProp } from "../../utils/types";

const Tab = createBottomTabNavigator<AppNavigationProp>();
interface TabIconProps {
  Restaurants: keyof typeof Ionicons.glyphMap;
  Settings: keyof typeof Ionicons.glyphMap;
  Map: keyof typeof Ionicons.glyphMap;
  Checkout: keyof typeof Ionicons.glyphMap;
}

const TAB_ICON: TabIconProps = {
  Restaurants: "fast-food-outline",
  Settings: "settings-outline",
  Map: "map",
  Checkout: "cart",
};

const AppNavigator = () => {
  return (
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <CartContextProvider>
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
              <Tab.Screen
                name="Restaurants"
                component={RestaurantsNavigation}
              />
              <Tab.Screen name="Map" component={MapScreen} />
              <Tab.Screen name="Checkout" component={CheckoutScreen} />
              <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
          </CartContextProvider>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
};

export default AppNavigator;
