import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../Button/Button";
import {
  cancelBtnCredit,
  nextBtnCredit,
} from "../../constants/Payment.constant";
import "./FormStripe.scss";
import { postCreditCardService } from "../../middlewares/paymentMiddleware";
import { useDispatch } from "react-redux";

const FormStripe = React.memo(({ onClose }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [next, setNext] = useState(false);
  const [btnNext, setBtnNext] = useState({
    ...nextBtnCredit,
  });

  useEffect(() => {
    if (next) {
      handleSubmit();
      setNext(false);
    }
  }, [next]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setBtnNext((state) => {
      return {
        ...state,
        disabled: !stripe || !elements,
      };
    });
  }, [elements, stripe]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    if (elements === null) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (cardElement === null) {
      return;
    }

    const { token } = await stripe.createToken(cardElement);
    onClose();
    dispatch(postCreditCardService(token?.id));
  };

  return (
    <>
      <div style={{
        backgroundColor: '#F2F2F2',
        padding: "16px 12px",
        borderRadius: '8px'
      }}>
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "20px",
                color: "#282828",
                "::placeholder": {
                  color: "#282828",
                },
                backgroundColor: "#F2F2F2",
              },
              invalid: {
                color: "#E57565",
              },
            },
          }}
        />
      </div>

      <div className="formbtns">
        <div className="formbtn">
          <Button
            data={btnNext}
            onClick={() => {
              setNext(true);
            }}
          />
        </div>
        <div className="formbtn">
          <Button data={cancelBtnCredit} onClick={onClose} />
        </div>
      </div>
    </>
  );
});

export default FormStripe;
