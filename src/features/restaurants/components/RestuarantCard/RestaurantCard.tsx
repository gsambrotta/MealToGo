import React from "react";
import { Button, Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import StarIcon from "../../../../../assets/star";
import OpenIcon from "../../../../../assets/open";
import { TextComp } from "../../../../components/Typography/Text";
import { RestaurantsType, RestaurantType } from "../../../../utils/types";
import {
  CardContainer,
  CardContent,
  Rating,
  InfoRow,
  InfoRowEnd,
  CusineIcon,
} from "./RestaurantCard.style";

type RestaurantPropType = {
  restaurant: RestaurantType;
};

const RestaurantCard = ({ restaurant }: RestaurantPropType) => {
  const {
    name,
    icon,
    photo,
    address,
    isOpenNow,
    rating,
    isClosedTemporarily,
  }: RestaurantType = restaurant;
  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <CardContainer mode="elevated" elevation={5}>
      {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
      <Card.Cover source={{ uri: photo[0] }} />
      <CardContent>
        <TextComp variant="label">{name}</TextComp>
        <InfoRow>
          <Rating>
            {ratingArray.map((rating, i) => (
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
      {/* <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
    </CardContainer>
  );
};

export default RestaurantCard;
