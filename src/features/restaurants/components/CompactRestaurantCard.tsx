import React from "react";
import WebView from "react-native-webview";
import { Platform, Image } from "react-native";

import { TextComp } from "../../../components/Typography/Text";
import FavouriteIcon from "../../../components/Favourites/FavouriteIcon";

import { RestaurantType } from "../../../utils/types";
import styled from "styled-components/native";

export type CompactCardPropType = {
  restaurant: RestaurantType;
  isMap?: boolean;
};

const CompactImage = styled(Image)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

const CompactRestaurantCard = ({
  restaurant,
  isMap = false,
}: CompactCardPropType) => {
  return (
    <Item>
      <FavouriteIcon restaurant={restaurant} />
      {isAndroid && isMap ? (
        <CompactWebview source={{ uri: restaurant.photos[0] }} />
      ) : (
        <CompactImage source={{ uri: restaurant.photos[0] }} />
      )}

      <TextComp variant="caption" numberOfLines={3}>
        {restaurant.name}
      </TextComp>
    </Item>
  );
};

export default CompactRestaurantCard;
