import React from "react";
// @ts-ignore
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { cardTokenRequest } from "../../../services/checkout/CheckoutService";

interface CreditCardFormData {
  valid: boolean;
  values: {
    number: string;
    expiry: string;
    cvc: string;
    type: string;
  };
  status: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
    postalCode: string;
  };
}

export type CreditCardInputProp = {
  name: string;
  onSuccess: (info: any) => void;
  onError: () => void;
};

export const CreditCardInput = ({
  name,
  onSuccess,
  onError,
}: CreditCardInputProp) => {
  const handleOnChange = async (formData: CreditCardFormData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    const expiry = values.expiry.split("/");

    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name,
    };

    if (!isIncomplete) {
      try {
        const info = await cardTokenRequest(card);
        onSuccess(info);
      } catch (err) {
        console.error("Error in credit card", err);
        onError();
      }
    }
  };

  return <LiteCreditCardInput onChange={handleOnChange} />;
};

export default CreditCardInput;
