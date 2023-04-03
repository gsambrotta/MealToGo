import React from "react";
import type { StackScreenProps } from "@react-navigation/stack";

import { Spacer } from "../../../components/Spacer";
import {
  ImageBackground,
  AccountCover,
  AuthButton,
  AccountContainer,
} from "../components/Account.style";

import { AccountNavigationProp } from "../../../utils/types";

type AccountScreenProps = StackScreenProps<
  AccountNavigationProp,
  "AccountScreen"
>;

const AccountScreen = ({ navigation }: AccountScreenProps) => {
  return (
    <ImageBackground>
      <AccountCover />
      <AccountContainer>
        <AuthButton
          mode="contained"
          icon="lock-open-outline"
          onPress={() => navigation.navigate("LoginScreen")}
        >
          Login
        </AuthButton>

        <Spacer size="large">
          <AuthButton
            mode="contained"
            icon="email"
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </ImageBackground>
  );
};

export default AccountScreen;
