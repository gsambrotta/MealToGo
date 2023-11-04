import React, { useState, useContext } from "react";
import { FlatList, ListRenderItem, View, TouchableOpacity } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import type { StackScreenProps } from "@react-navigation/stack";

import { SafeArea } from "../../../components/SafeArea";
import { Spacer } from "../../../components/Spacer";
import { TextComp } from "../../../components/Typography/Text";
import { RestaurantsContext } from "../../../services/restaurants/RestaurantsContext";
import { LocationContext } from "../../../services/location/LocationContext";
import { FavouritesContext } from "../../../services/favourites/FavouritesContext";
import RestuarantCard from "../components/RestuarantCard/RestaurantCard";
import SearchComponent from "../components/RestuarantCard/SearchComponent";
import { FadeView } from "../../../components/animations/Fade";
import { RestaurantType, AppNavigationProp } from "../../../utils/types";
import styled from "styled-components/native";
import { theme } from "../../../infrastructure/theme";
import FavouriteBar from "../../../components/Favourites/FavouriteBar";

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

type RestaurantsScreenProps = StackScreenProps<
  AppNavigationProp,
  "RestaurantsScreen"
>;

const RestaurantsScreen = ({ navigation }: RestaurantsScreenProps) => {
  const { restaurants, isLoading, error } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const { location, isLoadingLocation, errorLocation } =
    useContext(LocationContext);

  const [isToggle, setIsToggle] = useState(false);

  const renderRestaurantData: ListRenderItem<RestaurantType> = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("RestaurantDetailScreen", { restaurant: item })
        }
      >
        <FadeView>
          <RestuarantCard restaurant={item} />
        </FadeView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeArea>
      <>
        <SearchComponent
          isFavouritesToggle={isToggle}
          onFavouritesToggle={() => setIsToggle(!isToggle)}
        />
        {(isLoading || isLoadingLocation) && (
          <LoadingSpinner
            size="large"
            animating={true}
            color={theme.colors.brand.primary}
          />
        )}

        {!isLoading && !isLoadingLocation && (
          <>
            {errorLocation || error ? (
              <Spacer size="large">
                <TextComp variant="error">
                  {`An error occurred: ${!error ? errorLocation : error}`}
                </TextComp>
              </Spacer>
            ) : (
              <>
                {isToggle && (
                  <FavouriteBar
                    favourites={favourites}
                    onNavigate={navigation.navigate}
                  />
                )}
                <RestaurantList
                  data={restaurants}
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

export default RestaurantsScreen;
