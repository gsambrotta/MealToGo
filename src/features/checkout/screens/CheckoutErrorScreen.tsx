import React from "react";

import { TextComp } from "../../../components/Typography/Text";
import { SafeArea } from "../../../components/SafeArea";
import { colors } from "../../../infrastructure/theme/colors";
import { CartIconContainer, CartIcon } from "../components/Checkout.style";

import { AppNavigationProp } from "../../../utils/types";
import { StackScreenProps } from "@react-navigation/stack";

export type CheckoutErrorScreenNavigationProps = StackScreenProps<
  AppNavigationProp,
  "RestaurantDetailScreen"
>;

type CheckoutErrorScreenProps = {
  navigation: CheckoutErrorScreenNavigationProps;
  route: any;
};

const CheckoutErrorScreen = ({
  navigation,
  route,
}: CheckoutErrorScreenProps) => {
  const { error = "" } = route.params;
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="close" bg={colors.ui.error} />
        <TextComp variant="label">{error}</TextComp>
      </CartIconContainer>
    </SafeArea>
  );
};

export default CheckoutErrorScreen;
