import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountNavigationProp } from "../../utils/types";
import AccountScreen from "../../features/account/screens/AccountScreen";
import Loginscreen from "../../features/account/screens/LoginScreen";
import RegisterScreen from "../../features/account/screens/RegisterScreen";

const AccountStack = createStackNavigator<AccountNavigationProp>();

const AccountNavigator = () => {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AccountStack.Screen name="AccountScreen" component={AccountScreen} />
      <AccountStack.Screen name="LoginScreen" component={Loginscreen} />
      <AccountStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </AccountStack.Navigator>
  );
};

export default AccountNavigator;
