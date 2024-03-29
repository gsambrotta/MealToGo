import React from "react";
import { Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import StarIcon from "../../../../../assets/star";
import OpenIcon from "../../../../../assets/open";
import { TextComp } from "../../../../components/Typography/Text";
import FavouriteIcon from "../../../../components/Favourites/FavouriteIcon";

import { RestaurantType, RestaurantPropType } from "../../../../utils/types";
import {
  CardContainer,
  CardContent,
  Rating,
  InfoRow,
  InfoRowEnd,
  CusineIcon,
} from "./RestaurantCard.style";

const RestaurantCard = ({ restaurant }: RestaurantPropType) => {
  const {
    name,
    icon,
    photos,
    address,
    isOpenNow,
    rating,
    isClosedTemporarily,
  }: RestaurantType = restaurant;

  const ratingArray = rating && Array.from(new Array(Math.floor(rating)));
  return (
    <CardContainer mode="elevated" elevation={5}>
      <FavouriteIcon restaurant={restaurant} />
      <Card.Cover source={{ uri: photos[0] }} />
      <CardContent>
        <TextComp variant="label">{name}</TextComp>
        <InfoRow>
          <Rating>
            {ratingArray &&
              ratingArray.map((rating, i) => (
                <SvgXml xml={StarIcon} width={20} height={20} key={i} />
              ))}
          </Rating>
          <InfoRowEnd>
            {isClosedTemporarily && (
              <TextComp variant="error"> CLOSE TEMPORARLY </TextComp>
            )}
            {isOpenNow && <SvgXml xml={OpenIcon} width={20} height={20} />}
            <CusineIcon source={{ uri: icon }} />
          </InfoRowEnd>
        </InfoRow>
        <TextComp variant="caption">{address}</TextComp>
      </CardContent>
    </CardContainer>
  );
};

export default RestaurantCard;
