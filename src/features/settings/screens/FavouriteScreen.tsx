import React, { useContext } from "react";
import { FlatList, ListRenderItem, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import styled from "styled-components";

import { SafeArea } from "../../../components/SafeArea";
import RestuarantCard from "../../restaurants/components/RestuarantCard/RestaurantCard";
import { RestaurantsContext } from "../../../services/restaurants/RestaurantsContext";
import { theme } from "../../../infrastructure/theme";
import { AppNavigationProp, RestaurantType } from "../../../utils/types";
import { StackScreenProps } from "@react-navigation/stack";
import { FavouritesContext } from "../../../services/favourites/FavouritesContext";

const LoadingSpinner = styled(ActivityIndicator)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// .attr -> give specific props to the FlatList
const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

type FavouriteScreenProps = StackScreenProps<
  AppNavigationProp,
  "FavouriteScreen"
>;

const FavouriteScreen = ({ navigation }: FavouriteScreenProps) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);

  const renderRestaurantData: ListRenderItem<RestaurantType> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RestaurantDetailScreen", { restaurant: item })
        }
      >
        <RestuarantCard restaurant={item} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeArea>
      <>
        {isLoading && (
          <LoadingSpinner
            size="large"
            animating={true}
            color={theme.colors.brand.primary}
          />
        )}

        {!isLoading && (
          <>
            {error && (
              <View>
                <Text> {`An error occurred: ${error}`}</Text>
              </View>
            )}

            {!error && !favourites.length && (
              <View>
                <Text> You have no favourite yet. </Text>
              </View>
            )}

            {favourites.length > 0 && (
              <>
                <RestaurantList
                  data={favourites}
                  // @ts-ignore
                  renderItem={renderRestaurantData}
                  keyExtractor={(item: any, index: number) => item.name}
                />
              </>
            )}
          </>
        )}
      </>
    </SafeArea>
  );
};

export default FavouriteScreen;
