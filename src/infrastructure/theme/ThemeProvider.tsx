import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { theme } from "./index";

type Props = {
  children?: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => (
  <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
);
