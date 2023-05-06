import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import SettingsScreen from "../../features/settings/screens/SettingsScreen";
import { SettingsNavigationProp } from "../../utils/types";

const SettingsStack = createStackNavigator<SettingsNavigationProp>();

const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
      {/* <SettingsStack.Screen name="FavouriteScreen" component={FavouriteScreen} /> */}
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
