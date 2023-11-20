import React from "react";

import { TextComp } from "../../../components/Typography/Text";
import { SafeArea } from "../../../components/SafeArea";
import { CartIconContainer, CartIcon } from "../components/Checkout.style";

const CheckoutSuccesScreen = () => {
  return (
    <SafeArea>
      <CartIconContainer>
        <CartIcon icon="check-bold" />
        <TextComp variant="label">Success!</TextComp>
      </CartIconContainer>
    </SafeArea>
  );
};

export default CheckoutSuccesScreen;
