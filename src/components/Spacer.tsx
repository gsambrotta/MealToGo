import styled from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

type sizeVariantType = {
  small: string;
  medium: string;
  large: string;
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

type positionVariantType = {
  top: string;
  left: string;
  right: string;
  bottom: string;
};

type Variants = {
  position?: string;
  size?: string;
  theme: DefaultTheme;
};

const getVariant = (position: string, size: string, theme: DefaultTheme) => {
  const property = positionVariant[position as keyof positionVariantType];
  const sizeIndex = sizeVariant[size as keyof sizeVariantType];
  const value = theme.space[sizeIndex];

  return `${property}: ${value}`;
};

export const Spacer = styled.View`
  ${({ position = "top", size = "small", theme }: Variants) =>
    getVariant(position, size, theme)}
`;

// Spacer.defaultProps = {
//   position: "top",
//   size: "small",
// };
