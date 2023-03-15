import React from "react";
import type { StackScreenProps } from "@react-navigation/stack";

import { RestaurantavigationProp } from "../../../utils/types";
import {
  CardContainer,
  CardContent,
} from "./RestuarantCard/RestaurantCard.style";

type RestaurantDetailProps = StackScreenProps<
  RestaurantavigationProp,
  "RestaurantDetails"
>;

const RestaurantDetail = ({ navigation }: RestaurantDetailProps) => {
  return (
    <CardContainer mode="elevated" elevation={5}>
      <CardContent>helloo</CardContent>
    </CardContainer>
  );
};

export default RestaurantDetail;
