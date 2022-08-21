import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/PaymentComponents/CheckoutForm";

function Payment() {
   const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
   return (
      <div>
         <Elements stripe={stripePromise}>
            <CheckoutForm />
         </Elements>
      </div>
   );
}
export default Payment