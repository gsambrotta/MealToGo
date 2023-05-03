import React, { useContext } from "react";
import { Text, Button } from "react-native-paper";
import { SafeArea } from "../../../components/SafeArea";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";

const SettingsScreen: React.FC = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <Text>Hello??</Text>
      <Button onPress={() => onLogout()}>logout</Button>
    </SafeArea>
  );
};

export default SettingsScreen;
