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

type RegisterScreenProps = StackScreenProps<
  AccountNavigationProp,
  "RegisterScreen"
>;

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");

  const { onRegister, error, isLoading } = useContext(AuthenticationContext);

  const onSubmitRegistration = () => {
    if (!email || !password || !repeatedPassword) return;

    onRegister(email, password, repeatedPassword);
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
        <Spacer size="large">
          <TextInput
            label="repeated password"
            textContentType="password"
            autoCapitalize="none"
            secureTextEntry
            value={repeatedPassword}
            onChangeText={(text) => setRepeatedPassword(text)}
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
              icon="email"
              onPress={onSubmitRegistration}
            >
              Register
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

export default RegisterScreen;
