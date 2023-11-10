import React, { useState, useContext } from "react";
import { View } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { List, Text } from "react-native-paper";

import { CartContext } from "../../../services/cart/CartContext";
import { AppNavigationProp } from "../../../utils/types";
import { SafeArea } from "../../../components/SafeArea";
import { CreditCardInput } from "../components/CreditCard";

type CheckoutScreenProps = StackScreenProps<AppNavigationProp, "Checkout">;

import {
  CartIconContainer,
  CartIcon,
  NameInput,
} from "../components/Checkout.style";
import { ScrollView } from "react-native-gesture-handler";
import { Spacer } from "../../../components/Spacer";
import RestaurantCard from "../../restaurants/components/RestuarantCard/RestaurantCard";

const CheckoutScreen = ({ navigation }: CheckoutScreenProps) => {
  const { cart, restaurant, sum } = useContext(CartContext);
  const [name, setName] = useState<string>("");

  if (!cart.length || !restaurant) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Your cart is empty!</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <View>
        <RestaurantCard restaurant={restaurant} />
      </View>
      <ScrollView>
        <Spacer size="medium">
          <Spacer size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }, index) => {
              return (
                <List.Item
                  key={index}
                  title={`${item} - ${Number(price) / 100}`}
                ></List.Item>
              );
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <NameInput
          label="Name"
          onChangeText={(input) => {
            if (Text.length) {
              setName(input);
            } else {
              setName("");
            }
          }}
        />
        {name.length > 0 && <CreditCardInput name={name} />}
      </ScrollView>
    </SafeArea>
  );
};

export default CheckoutScreen;
