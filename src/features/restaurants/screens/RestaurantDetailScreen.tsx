import React, { useState, useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Button, List } from "react-native-paper";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import RestaurantCard from "../components/RestuarantCard/RestaurantCard";
import { SafeArea } from "../../../components/SafeArea";
import { Spacer } from "../../../components/Spacer";
import { colors } from "../../../infrastructure/theme/colors";
import {
  CartContext,
  AddToCartFunction,
} from "../../../services/cart/CartContext";

const OrderButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 80%;
  align-self: center;
`;

const RestaurantDetailScreen = (props: any) => {
  const { route } = props;
  const navigation = useNavigation();
  const { restaurant } = route.params;
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);
  const { addToCart }: { addToCart: AddToCartFunction } =
    useContext(CartContext);

  return (
    <SafeArea>
      <RestaurantCard restaurant={restaurant} />
      <ScrollView>
        <List.AccordionGroup>
          <List.Accordion
            id="breakfast"
            title="Breakfast"
            left={(props) => <List.Icon {...props} icon="food-croissant" />}
          >
            <List.Item title="Eggs" />
            <List.Item title="Muesli" />
          </List.Accordion>

          <List.Accordion
            id="lunch"
            title="Lunch"
            left={(props) => <List.Icon {...props} icon="food-apple" />}
          >
            <List.Item title="Salad" />
            <List.Item title="Pasta" />
          </List.Accordion>

          <List.Accordion
            id="dinner"
            title="Dinner"
            left={(props) => <List.Icon {...props} icon="food-turkey" />}
            expanded={expanded}
            onPress={handlePress}
          >
            <List.Item title="Tofu saute" />
            <List.Item title="Cous cous with vegetables" />
          </List.Accordion>
        </List.AccordionGroup>
      </ScrollView>

      <Spacer size="large">
        <OrderButton
          mode="contained"
          onPress={() => {
            addToCart({ item: "special", price: "1299" }, restaurant);
            // @ts-ignore
            navigation.navigate("Checkout");
          }}
        >
          Order special only 12.99$
        </OrderButton>
      </Spacer>
    </SafeArea>
  );
};

export default RestaurantDetailScreen;
