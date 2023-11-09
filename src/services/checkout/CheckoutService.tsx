// @ts-ignore
import createStripe from "stripe-client";
const stripe = createStripe(
  "pk_test_51O9DKSHjRKvbmGTcjOMXnJZxBoUzUXqCgzucZTMF9fNyZ3CBX1bb8cQipPyLmIYE72szKEv19uWsvIvbCYN3gfV900UXIG0j9c"
);

interface cardProps {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  name: string;
}

export const cardTokenRequest = (card: cardProps) => {
  return stripe.createToken({ card });
};
