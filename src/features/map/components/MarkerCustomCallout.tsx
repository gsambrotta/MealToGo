import React from "react";
import { View } from "react-native";

import { RestaurantPropType } from "../../../utils/types";
import CompactRestaurantCard from "../../restaurants/components/CompactRestaurantCard";

const MarkerCustomCallout = ({ restaurant }: RestaurantPropType) => {
  return (
    <View>
      <CompactRestaurantCard restaurant={restaurant} isMap />
    </View>
  );
};

export default MarkerCustomCallout;
