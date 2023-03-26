import React from "react";
import { View } from "react-native";

import { RestaurantType } from "../../../utils/types";
import CompactRestaurantCard from "../../restaurants/components/CompactRestaurantCard";

type RestaurantPropType = {
  restaurant: RestaurantType;
};

const MarkerCustomCallout = ({ restaurant }: RestaurantPropType) => {
  return (
    <View>
      <CompactRestaurantCard restaurant={restaurant} />
    </View>
  );
};

export default MarkerCustomCallout;
