// @ts-ignore
import createStripe from "stripe-client";
import { hostPay } from "../../utils/env";
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

export const payRequest = (token: string, amount: number, name: string) => {
  if (!token || !amount || !name) return;

  const fetchData = async () => {
    try {
      const payRes = await fetch(`${hostPay}/pay`, {
        body: JSON.stringify({
          token,
          name,
          amount,
        }),
        method: "POST",
      });
      console.log("payRes", payRes);
      if (payRes.status > 200) {
        console.log("Something went wrong processing the payment");
        return { ok: false };
      }

      return payRes.json();
    } catch (err) {
      console.error("error Pay stripe from firebase functions");
      return { ok: false };
    }
  };

  return fetchData();
};
