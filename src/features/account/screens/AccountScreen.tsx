import React from "react";
import type { StackScreenProps } from "@react-navigation/stack";
import LottieView from "lottie-react-native";
import { Spacer } from "../../../components/Spacer";

import {
  ImageBackground,
  AccountCover,
  AuthButton,
  AccountContainer,
  AnimationWrapper,
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
      <AnimationWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/watermelon.json")}
        />
      </AnimationWrapper>
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
