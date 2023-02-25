import React from "react";
import {
  Platform,
  StatusBar,
} from "react-native";
import styled from 'styled-components/native'
import Searchbox from "../../../components/SearchBox";
import RestuarantInfo from "../components/restaurantCard";

const MainContainer = styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    padding-top: ${Platform.OS === "android" ? StatusBar.currentHeight : 0}px;
`
const SearchContainer = styled.View`
    padding: ${props => props.theme.space[3]}
`
const RestuarantsContainer = styled.View`
    flex: 1;
    align-self: stretch;
    background-color: ${props => props.theme.colors.bg.secondary};
    padding: ${props => props.theme.space[3]};
`

export default function RestuarantsScreen() {
  return (
      <MainContainer>
        <SearchContainer>
          <Searchbox />
        </SearchContainer>
        <RestuarantsContainer>
          <RestuarantInfo />
        </RestuarantsContainer>
      </MainContainer>
  );
}

