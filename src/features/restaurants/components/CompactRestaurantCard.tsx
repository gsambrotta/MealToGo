import React from "react";
import WebView from "react-native-webview";
import { Platform, Image } from "react-native";

import { TextComp } from "../../../components/Typography/Text";

import { RestaurantType } from "../../../utils/types";
import styled from "styled-components/native";

type RestaurantPropType = {
  restaurant: RestaurantType;
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

const CompactRestaurantCard = ({ restaurant }: RestaurantPropType) => {
  return (
    <Item>
      {isAndroid ? (
        <CompactWebview source={{ uri: restaurant.photo[0] }} />
      ) : (
        <CompactImage source={{ uri: restaurant.photo[0] }} />
      )}

      <TextComp variant="caption" numberOfLines={3}>
        {restaurant.name}
      </TextComp>
    </Item>
  );
};

export default CompactRestaurantCard;
