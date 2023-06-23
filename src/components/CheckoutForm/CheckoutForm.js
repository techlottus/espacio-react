import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import env from "../../enviroment/environment";
import FormStripe from "./FormStripe";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  env.publicKeyStripe
);

const CheckoutForm = React.memo(({onClose}) => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: env.clientStripe,
  };

  return (
    <Elements stripe={stripePromise} options={options} >
      <FormStripe onClose={onClose}/>
    </Elements>
  );
});

export default CheckoutForm;
