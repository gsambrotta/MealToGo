import React from "react";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { Platform } from "react-native";

import { TextComp } from "../../../components/Typography/Text";

import { RestaurantType } from "../../../utils/types";

type RestaurantPropType = {
  restaurant: RestaurantType;
};

const CompactImage = styled.Image`
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

const CompactRestaurantCard = ({ restaurant }: RestaurantPropType) => {
  const Image = isAndroid ? CompactWebview : CompactImage;

  return (
    <Item>
      <Image source={{ uri: restaurant.photo[0] }} />
      <TextComp variant="caption" numberOfLines={3}>
        {restaurant.name}
      </TextComp>
    </Item>
  );
};

export default CompactRestaurantCard;
