import React, { useState, useContext } from "react";
import type { StackScreenProps } from "@react-navigation/stack";
import { TextInput, ActivityIndicator } from "react-native-paper";

import { Spacer } from "../../../components/Spacer";
import { TextComp } from "../../../components/Typography/Text";
import {
  ImageBackground,
  AccountCover,
  AuthButton,
  AccountContainer,
  Title,
  ErrorContainer,
} from "../components/Account.style";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";

import { AccountNavigationProp } from "../../../utils/types";
import { colors } from "../../../infrastructure/theme/colors";

type LoginScreenProps = StackScreenProps<AccountNavigationProp, "LoginScreen">;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  const onSubmitLogin = () => {
    if (!email || !password) return;

    onLogin(email, password);
  };

  return (
    <ImageBackground>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <TextInput
          label="Email"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Spacer size="large">
          <TextInput
            label="password"
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </Spacer>
        {error && (
          <Spacer size="large">
            <ErrorContainer>
              <TextComp variant="error">{error}</TextComp>
            </ErrorContainer>
          </Spacer>
        )}
        <Spacer size="large">
          {isLoading ? (
            <ActivityIndicator animating={true} color={colors.brand.primary} />
          ) : (
            <AuthButton
              mode="contained"
              icon="lock-open-outline"
              onPress={onSubmitLogin}
            >
              Login
            </AuthButton>
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </Spacer>
    </ImageBackground>
  );
};

export default LoginScreen;
