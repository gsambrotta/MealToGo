import React, { useContext } from "react";
import { View, FlatList, ListRenderItem } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import { SafeArea } from "../../../components/SafeArea";
import { RestaurantsContext } from "../../../services/restaurants/RestaurantsContext";
import Searchbox from "../../../components/SearchBox";
import RestuarantCard from "../components/RestuarantCard/RestaurantCard";

import { RestaurantType } from "../../../utils/types";
import styled from "styled-components/native";
import { theme } from "../../../infrastructure/theme";

const SearchContainer = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

// .attr -> give specific props to the FlatList
const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const LoadingSpinner = styled(ActivityIndicator)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const renderRestaurantData: ListRenderItem<RestaurantType> = ({ item }) => {
  return <RestuarantCard restaurant={item} />;
};

const RestaurantsScreen: React.FC = () => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingSpinner
          size="large"
          animating={true}
          color={theme.colors.brand.primary}
        />
      )}

      {!isLoading && !error && (
        <>
          <SearchContainer>
            <Searchbox />
          </SearchContainer>
          <RestaurantList
            data={restaurants}
            // @ts-ignore
            renderItem={renderRestaurantData}
            keyExtractor={(item: any, index: number) => item.name}
          />
        </>
      )}
    </SafeArea>
  );
};

export default RestaurantsScreen;
