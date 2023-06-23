import React, { useEffect } from "react";
import "./FormCreditCard.scss";
import CheckoutForm from "../../../../components/CheckoutForm/CheckoutForm";

const FormCreditCard = ({ isShow, onClose }) => {

  useEffect(() => {
    if (isShow) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isShow]);

  const handleForm = () => {
    return (
      <div className="formcreditcardcontainer">
        <div className="close">
          <span
            className="material-icons"
            onClick={() => {
              onClose();
            }}
          >
            close
          </span>
        </div>
        <div className="title">
          <h2>Completa los datos de tu tarjeta</h2>
        </div>
        <div className="formcontainer">
          <CheckoutForm 
            onClose={onClose}
          />
        </div>
      </div>
    );
  };

  return <>{isShow ? handleForm() : ""}</>;
};

export default FormCreditCard;
