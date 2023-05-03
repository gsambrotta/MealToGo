import { Platform, StatusBar } from "react-native";
import styled from "styled-components/native";
import { ThemeType } from "../utils/types";

export const SafeArea = styled.SafeAreaView<ThemeType>`
  flex: 1;
  flex-direction: column;
  padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
