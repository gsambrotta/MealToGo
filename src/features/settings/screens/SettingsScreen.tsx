import React, { useContext, useState, useCallback } from "react";
import { List, Avatar } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [photo, setPhoto] = useState("");

  const getProfilePic = async (currUser: any) => {
    try {
      const photoUri = await AsyncStorage.getItem(`@profile-${currUser.id}`);

      if (photoUri !== null) {
        setPhoto(photoUri);
      }
    } catch (error) {
      console.log("err getting Fav localstorage", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePic(user);
    }, [user])
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          {!photo ? (
            <Avatar.Icon size={180} icon="human" />
          ) : (
            <Avatar.Image size={180} source={{ uri: photo }} />
          )}
        </TouchableOpacity>
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
          onPress={() => navigation.navigate("FavouriteScreen")}
        />
        <Spacer />
        {/* <SettingsItem
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
        /> */}
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
