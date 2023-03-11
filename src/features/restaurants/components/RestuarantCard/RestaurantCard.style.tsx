import styled from "styled-components/native";
import { ThemeType } from "../../../../utils/types";
import { Card } from "react-native-paper";

export const CardContainer = styled(Card)`
  padding: ${(props) => props.theme.space[3]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
export const CardContent = styled(Card.Content)`
  padding: ${(props) => props.theme.space[0]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const InfoRow = styled.View<ThemeType>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[0]};
`;

export const Rating = styled.View<ThemeType>`
  flex-direction: row;
`;
export const InfoRowEnd = styled.View<ThemeType>`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 60%;
`;

export const CusineIcon = styled.Image<ThemeType>`
  width: 20px;
  height: 20px;
`;
