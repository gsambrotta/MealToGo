import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import type { StackScreenProps } from "@react-navigation/stack";
import { List } from "react-native-paper";

import RestaurantCard from "../components/RestuarantCard/RestaurantCard";
import { SafeArea } from "../../../components/SafeArea";

import { AppNavigationProp } from "../../../utils/types";

type RestaurantDetailScreenNavigationProps = StackScreenProps<
  AppNavigationProp,
  "RestaurantDetailScreen"
>;

type RestaurantDetailScreenProps = {
  navigation: RestaurantDetailScreenNavigationProps;
  route: any;
};

const RestaurantDetailScreen = ({
  navigation,
  route,
}: RestaurantDetailScreenProps) => {
  const { restaurant } = route.params;

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

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
    </SafeArea>
  );
};

export default RestaurantDetailScreen;
