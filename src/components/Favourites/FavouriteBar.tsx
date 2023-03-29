import React from "react";
import styled from "styled-components";
import { View, ScrollView, TouchableOpacity } from "react-native";

import CompactRestaurantCard from "../../features/restaurants/components/CompactRestaurantCard";
import { TextComp } from "../Typography/Text";

import { RestaurantType } from "../../utils/types";

export type FavouriteBarPropType = {
  favourites: RestaurantType[];
  onNavigate: (arg1: any, arg2: any) => void;
};

const FavouritesWrapper = styled(View)`
  padding: 10px;
`;

const FavouriteBar = ({ favourites, onNavigate }: FavouriteBarPropType) => {
  if (!favourites.length) {
    return null;
  }

  return (
    <FavouritesWrapper>
      <TextComp variant="body"> Favourite: </TextComp>
      <ScrollView horizontal showsVerticalScrollIndicator={false}>
        {favourites.map((favourite, index) => {
          return (
            <View key={index} style={{ marginRight: 10 }}>
              <TouchableOpacity
                onPress={() =>
                  onNavigate("RestaurantDetailScreen", {
                    restaurant: favourite,
                  })
                }
              >
                <CompactRestaurantCard restaurant={favourite} />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </FavouritesWrapper>
  );
};

export default FavouriteBar;
