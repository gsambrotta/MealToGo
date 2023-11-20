import React, { useState, useContext } from "react";
import { View } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { List, Text } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

import { CartContext } from "../../../services/cart/CartContext";
import { AppNavigationProp } from "../../../utils/types";
import { SafeArea } from "../../../components/SafeArea";
import { CreditCardInput } from "../components/CreditCard";
import { Spacer } from "../../../components/Spacer";
import RestaurantCard from "../../restaurants/components/RestuarantCard/RestaurantCard";
import { payRequest } from "../../../services/checkout/CheckoutService";

type CheckoutScreenProps = StackScreenProps<
  AppNavigationProp,
  "CheckoutScreen"
>;

import {
  CartIconContainer,
  CartIcon,
  NameInput,
  ClearButton,
  PayButton,
  PaymentProcessing,
} from "../components/Checkout.style";

const CheckoutScreen = ({ navigation }: CheckoutScreenProps) => {
  const { cart, restaurant, sum, clearCart } = useContext(CartContext);
  const [name, setName] = useState<string>("");
  const [card, setCard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPay = async () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      navigation.navigate("CheckoutErrorScreen", {
        error: "Please fill in a valid credit card",
      });
      return;
    }
    try {
      const res = await payRequest(card.id, sum, name);

      if (res.ok === false) {
        console.log("error 400");
        setIsLoading(false);
        navigation.navigate("CheckoutErrorScreen", {
          error: "Something went wrong processing your credit card",
        });
        return;
      } else {
        console.log("no err");
        setIsLoading(false);
        clearCart();
        navigation.navigate("CheckoutSuccessScreen");
        return;
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error in payRequst fetch", error);
      navigation.navigate("CheckoutErrorScreen", {
        error: "Something went wrong processing your credit card",
      });
      return;
    }
  };

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
        {isLoading && <PaymentProcessing />}
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
            if (input.length) {
              setName(input);
            } else {
              setName("");
            }
          }}
        />
        {name.length > 0 && (
          <CreditCardInput
            name={name}
            onSuccess={setCard}
            onError={() =>
              navigation.navigate("CheckoutErrorScreen", {
                error: "Something went wrong processing your credit card",
              })
            }
          />
        )}
        <PayButton
          disabled={isLoading}
          icon="cash"
          mode="contained"
          onPress={onPay}
        >
          Pay
        </PayButton>
        <Spacer size="large">
          <ClearButton
            disabled={isLoading}
            icon="cart-off"
            mode="contained"
            onPress={clearCart}
          >
            Clear
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};

export default CheckoutScreen;
