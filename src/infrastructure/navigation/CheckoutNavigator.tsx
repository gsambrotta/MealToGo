import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CheckoutNavigationProp } from "../../utils/types";
const CheckoutStack = createStackNavigator<CheckoutNavigationProp>();

import CheckoutScreen from "../../features/checkout/screens/CheckoutScreen";
import CheckoutErrorScreen from "../../features/checkout/screens/CheckoutErrorScreen";
import CheckoutSuccessScreen from "../../features/checkout/screens/CheckoutSuccessScreen";

const CheckoutNavigator = () => {
  return (
    <CheckoutStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CheckoutStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <CheckoutStack.Screen
        name="CheckoutSuccessScreen"
        component={CheckoutSuccessScreen}
      />
      <CheckoutStack.Screen
        name="CheckoutErrorScreen"
        component={CheckoutErrorScreen}
      />
    </CheckoutStack.Navigator>
  );
};

export default CheckoutNavigator;
