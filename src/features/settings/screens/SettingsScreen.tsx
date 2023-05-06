import React, { useContext } from "react";
import { List, Avatar } from "react-native-paper";
import type { StackScreenProps } from "@react-navigation/stack";
import styled from "styled-components/native";

import { SafeArea } from "../../../components/SafeArea";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../infrastructure/theme/colors";
import { TextComp } from "../../../components/Typography/Text";
import { SettingsNavigationProp } from "../../../utils/types";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
  background-color: rgba(255, 255, 255, 0.4);
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

type SettingsScreenProps = StackScreenProps<
  SettingsNavigationProp,
  "SettingsScreen"
>;

const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <AvatarContainer>
        <Avatar.Icon size={180} icon="human" />
        <Spacer size="large">
          <TextComp variant="label">{user?.email}</TextComp>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => (
            <List.Icon {...props} color={colors.ui.error} icon="heart" />
          )}
          // onPress={() => navigation.navigate("FavouriteScreen")}
        />
        <Spacer />
        <SettingsItem
          title="Payment"
          left={(props) => (
            <List.Icon {...props} color={colors.ui.secondary} icon="cart" />
          )}
          onPress={() => null}
        />
        <Spacer />
        <SettingsItem
          title="Past Orders"
          left={(props) => (
            <List.Icon {...props} color={colors.ui.secondary} icon="history" />
          )}
          onPress={() => null}
        />
        <Spacer />
        <SettingsItem
          title="Logout"
          left={(props) => (
            <List.Icon {...props} color={colors.ui.secondary} icon="door" />
          )}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};

export default SettingsScreen;
