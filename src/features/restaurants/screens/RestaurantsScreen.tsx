import React from "react";
import { View, FlatList } from "react-native";
import Searchbox from "../../../components/SearchBox";
import RestuarantCard from "../components/RestuarantCard/RestaurantCard";

import { restuarantProp } from "../../../infrastructure/types";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/SafeArea";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

// .attr -> give specific props to the FlatList
const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const RestaurantsScreen: React.FC = () => {
  return (
    <SafeArea>
      <SearchContainer>
        <Searchbox />
      </SearchContainer>
      <RestaurantList
        data={[{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }]}
        renderItem={() => <RestuarantCard />}
        keyExtractor={(item: any, index: number) => item.name}
      />
    </SafeArea>
  );
};

export default RestaurantsScreen;
