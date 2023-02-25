import React from "react";
import { Button, Card, Text } from 'react-native-paper';
import { SvgXml } from "react-native-svg";
import StarIcon from '../../../../assets/star'
import OpenIcon from '../../../../assets/open'

import styled from 'styled-components/native'

const CardContainer = styled(Card)`
  padding: ${props => props.theme.space[3]};
`
const CardContent = styled(Card.Content)`
  padding: ${props => props.theme.space[0]};
  margin-top: ${props => props.theme.space[2]};
`
const Title = styled(Text)`
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes.body};
  color: ${props => props.theme.colors.ui.primary};
`

const Address = styled(Text)`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.caption};
`
const InfoRow = styled.View`
  flex-direction: row;    
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.space[1]} ${props => props.theme.space[0]};
`

const Rating = styled.View`
  flex-direction: row;
`
const InfoRowEnd = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 60%;
`

const CloseTemporarly = styled(Text)`
  color: ${props => props.theme.colors.ui.error};
`

const CusineIcon = styled.Image`
  width: 20px; 
  height: 20px;
`


const mockRestuarant = {
    name: 'Pizza Mandrillo', 
    icon: 'https://cdn.iconscout.com/icon/free/png-256/south-indian-food-1851621-1569346.png', 
    photo: [
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.htaeyV5l35eaHU-EYrH_8wHaE8%26pid%3DApi&f=1&ipt=be9c305d5e94da93cc772b2af52d8db2becf94fddd6ca71900ac56d0e27bdc12&ipo=images',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.k53y3LnSF59Iuzc1QbNeFAHaE8%26pid%3DApi&f=1&ipt=14b62cf5d1e7f2fbf1c4f256c4d2258fe27cb7d757f00137aac55143b2bff58b&ipo=images',
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._CkXfhC-DGG3ow8FTuOxEAHaEF%26pid%3DApi&f=1&ipt=86cfe6aa0d2d9f40b16c0dbd9b8853074b6b02f7f5f4117f0812de5ac66b18c8&ipo=images'
    ], 
    address: "Via dei Gigli, 16", 
    isOpenNow: true, 
    rating: '4', 
    isClosedTemporarily: true
}

export default function RestuarantCard({ restuarant }) {
    const { name, icon, photo, address, isOpenNow, rating, isClosedTemporarily } = mockRestuarant
    const ratingArray = Array.from(new Array(Math.floor(rating)))

  return (
    <CardContainer mode='elevated' elevation={5}>
    {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
    <Card.Cover source={{ uri: photo[0] }} />
    <CardContent>
      <Title>{name}</Title>
      <InfoRow>
        <Rating>
          {ratingArray.map((rating, i) => 
            <SvgXml xml={StarIcon} width={20} height={20} key={i} />
          )}
        </Rating>
        <InfoRowEnd>
          {isClosedTemporarily && <CloseTemporarly> CLOSE TEMPORARLY </CloseTemporarly>}
          {isOpenNow && <SvgXml xml={OpenIcon} width={20} height={20} />}
          <CusineIcon source={{ uri: icon }} />
        </InfoRowEnd>
      </ InfoRow>
      <Address>{address}</Address>
    </CardContent>
    {/* <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
  </CardContainer>
  );
}
