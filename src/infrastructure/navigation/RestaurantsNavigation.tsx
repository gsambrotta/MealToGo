import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantavigationProp } from "../../utils/types";
import RestaurantsScreen from "../../features/restaurants/screens/RestaurantsScreen";
import RestaurantDetailScreen from "../../features/restaurants/screens/RestaurantDetailScreen";

const RestaurantStack = createStackNavigator<RestaurantavigationProp>();

const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <RestaurantStack.Screen
        name="RestaurantsScreen"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
      />
    </RestaurantStack.Navigator>
  );
};

export default RestaurantsNavigator;
