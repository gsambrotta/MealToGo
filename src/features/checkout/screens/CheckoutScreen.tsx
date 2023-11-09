import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import { CartContext } from "../../../services/cart/CartContext";
import { AppNavigationProp } from "../../../utils/types";
import { SafeArea } from "../../../components/SafeArea";
import { CreditCardInput } from "../components/CreditCard";
import { Button, Text } from "react-native-paper";

type CheckoutScreenProps = StackScreenProps<AppNavigationProp, "Checkout">;

const CheckoutScreen = ({ navigation }: CheckoutScreenProps) => {
  const { cart } = useContext(CartContext);
  return (
    <SafeArea>
      <CreditCardInput />
    </SafeArea>
  );
};

export default CheckoutScreen;
