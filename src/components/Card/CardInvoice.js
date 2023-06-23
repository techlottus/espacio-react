import React, { useEffect } from "react";
import { paymentInvoiceFeedback } from "../../constants/Payment.constant";

export const CardInvoice = React.memo(
  ({ data, onActions, onCheck, onRight }) => {
    const cardInvoiceRef = React.createRef();
    const feedbackRef = React.createRef();

    useEffect(() => {
      cardInvoiceRef.current.data = {
        id: data.id || "",
        title: data.title || "",
        actions: data.actions || [],
        description: data.description || "",
        checked: data.checked || "",
        isFeedback: data.isFeedback || false,
        disabled: data.disabled || false,
      };
      feedbackRef.current.data = {
        left: paymentInvoiceFeedback.left || {},
        right: paymentInvoiceFeedback.right || {},
        type: paymentInvoiceFeedback.type || "",
        isTextEvent: paymentInvoiceFeedback.isTextEvent,
        textEvent: paymentInvoiceFeedback.textEvent || "",
      };
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      cardInvoiceRef.current.addEventListener("onCheck", onCheck);
      cardInvoiceRef.current.addEventListener("onActions", onActions);
      feedbackRef.current.addEventListener("onRight", onRight);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <>
        <lottus-card-invoice ref={cardInvoiceRef}>
          <div content="">
            <lottus-feedback ref={feedbackRef}>
              <div content=""> {"Debes actualizar tus datos fiscales"}</div>
            </lottus-feedback>
          </div>
        </lottus-card-invoice>
      </>
    );
  }
);
