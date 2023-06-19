import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import SettingsScreen from "../../features/settings/screens/SettingsScreen";
import FavouriteScreen from "../../features/settings/screens/FavouriteScreen";
import CameraScreen from "../../features/settings/screens/CameraScreen";
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
      <SettingsStack.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
      />
      <SettingsStack.Screen name="CameraScreen" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
