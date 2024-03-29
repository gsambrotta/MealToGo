import React, { useRef, useState, useContext } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { Camera, CameraType } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextComp } from "../../../components/Typography/Text";
import { AuthenticationContext } from "../../../services/authentication/AuthenticationContext";

import styled from "styled-components/native";
import { AppNavigationProp } from "../../../utils/types";
import { StackScreenProps } from "@react-navigation/stack";

type FavouriteScreenProps = StackScreenProps<
  AppNavigationProp,
  "FavouriteScreen"
>;

const CameraContainer = styled.View`
  flex: 1;
`;

const CameraComp = styled(Camera)`
  flex: 2;
`;

const ButtonContainer = styled.View`
  margin: 12px;
  flex: 0.5;
  flex-direction: row;
  align-content: space-between;
`;

const FavouriteScreen = ({ navigation }: FavouriteScreenProps) => {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef: React.MutableRefObject<Camera | null> = useRef(null);
  const { user } = useContext(AuthenticationContext);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <CameraContainer>
        <TextComp variant="body">
          We need your permission to show the camera
        </TextComp>
        <Button onPress={requestPermission}>grant permission</Button>
      </CameraContainer>
    );
  }

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const clickCamera = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        await AsyncStorage.setItem(`@profile-${user.id}`, photo.uri);
        navigation.goBack();
      } catch (error) {
        console.log("err storing Fav localstorage", error);
      }
    }
  };

  return (
    <CameraContainer>
      <CameraComp
        type={type}
        ref={(camera) => (cameraRef.current = camera)}
        ratio={"4:3"}
      ></CameraComp>
      <ButtonContainer>
        <Button onPress={toggleCameraType}>Toggle camera</Button>
        <Button onPress={clickCamera}>Take a picture</Button>
      </ButtonContainer>
    </CameraContainer>
  );
};

export default FavouriteScreen;
