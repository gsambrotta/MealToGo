import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const ErrorContainer = styled(Card)`
  position: absolute;
  padding: ${(props) => props.theme.space[3]};
  margin: ${(props) => props.theme.space[3]};
  top: 20%;
`;
