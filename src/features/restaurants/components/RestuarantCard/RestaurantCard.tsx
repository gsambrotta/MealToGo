import React from "react";
import { Button, Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import StarIcon from "../../../../../assets/star";
import OpenIcon from "../../../../../assets/open";
import { TextComp } from "../../../../components/Typography/Text";
import { restuarantProp } from "../../../../infrastructure/types";
import {
  CardContainer,
  CardContent,
  Rating,
  InfoRow,
  InfoRowEnd,
  CusineIcon,
} from "./RestuarantCard.style";

const mockRestuarant = {
  name: "Pizza Mandrillo",
  icon: "https://cdn.iconscout.com/icon/free/png-256/south-indian-food-1851621-1569346.png",
  photo: [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.htaeyV5l35eaHU-EYrH_8wHaE8%26pid%3DApi&f=1&ipt=be9c305d5e94da93cc772b2af52d8db2becf94fddd6ca71900ac56d0e27bdc12&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.k53y3LnSF59Iuzc1QbNeFAHaE8%26pid%3DApi&f=1&ipt=14b62cf5d1e7f2fbf1c4f256c4d2258fe27cb7d757f00137aac55143b2bff58b&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._CkXfhC-DGG3ow8FTuOxEAHaEF%26pid%3DApi&f=1&ipt=86cfe6aa0d2d9f40b16c0dbd9b8853074b6b02f7f5f4117f0812de5ac66b18c8&ipo=images",
  ],
  address: "Via dei Gigli, 16",
  isOpenNow: true,
  rating: 4,
  isClosedTemporarily: true,
};

const RestuarantCard: React.FC = ({}) => {
  const {
    name,
    icon,
    photo,
    address,
    isOpenNow,
    rating,
    isClosedTemporarily,
  }: restuarantProp = mockRestuarant;
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

export default RestuarantCard;
