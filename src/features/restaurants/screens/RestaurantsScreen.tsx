import React, { useContext } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { SafeArea } from "../../../components/SafeArea";
import { RestaurantsContext } from "../../../services/restaurants/RestaurantsContext";
import RestuarantCard from "../components/RestuarantCard/RestaurantCard";
import SearchComponent from "../components/RestuarantCard/SearchComponent";

import { RestaurantType } from "../../../utils/types";
import styled from "styled-components/native";
import { theme } from "../../../infrastructure/theme";

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
          <SearchComponent />
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
