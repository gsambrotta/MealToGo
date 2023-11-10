import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { Button, List, Text } from "react-native-paper";

import { CartContext } from "../../../services/cart/CartContext";
import { AppNavigationProp } from "../../../utils/types";
import { SafeArea } from "../../../components/SafeArea";
import { CreditCardInput } from "../components/CreditCard";
import RestaurantDetailScreen from "../../restaurants/screens/RestaurantDetailScreen";

type CheckoutScreenProps = StackScreenProps<AppNavigationProp, "Checkout">;

import { CartIconContainer, CartIcon } from "../components/Checkout.style";
import { ScrollView } from "react-native-gesture-handler";
import { Spacer } from "../../../components/Spacer";

const CheckoutScreen = ({ navigation }: CheckoutScreenProps) => {
  const { cart, restaurant, sum } = useContext(CartContext);

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
      {/* <RestaurantDetailScreen restaurant={restaurant} /> */}
      <ScrollView>
        <Spacer size="medium">
          <Spacer size="large">
            <Text>Your Order</Text>
          </Spacer>
          <List.Section>
            {cart.map(({ item, price }) => {
              return (
                <List.Item
                  title={`${item} - ${Number(price) / 100}`}
                ></List.Item>
              );
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </Spacer>
        <CreditCardInput />
      </ScrollView>
    </SafeArea>
  );
};

export default CheckoutScreen;
