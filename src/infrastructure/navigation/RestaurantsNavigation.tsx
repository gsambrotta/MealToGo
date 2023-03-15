import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RestaurantavigationProp } from "../../utils/types";
import RestaurantsScreen from "../../features/restaurants/screens/RestaurantsScreen";
import RestaurantDetail from "../../features/restaurants/components/RestaurantDetail";

const RestaurantStack = createStackNavigator<RestaurantavigationProp>();

const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
      <RestaurantStack.Screen
        name="RestaurantsScreen"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetails"
        component={RestaurantDetail}
      />
    </RestaurantStack.Navigator>
  );
};

export default RestaurantsNavigator;
