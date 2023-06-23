import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./PaymentTotalPrice.scss";
import { convertMoney } from "../../../helpers/formatCurrency";

const textForPayment = "Resto por pagar";
const textForParcial = "Pago parcial";

const PaymentTotalPrice = ({
  price,
  charge = false,
  concept = 0.0,
  amount = 0.0,
  isRemaining = false,
  isToBePaid = false,
  totalParcial = 0.0,
}) => {
  const { texts } = useSelector((state) => state.texts);
  const [textRemaining, setTextRamaining] = useState(
    texts?.payment.resume.total
  );

  useEffect(() => {
    if (isRemaining) {
      setTextRamaining(textForPayment);
    } else {
      setTextRamaining(texts?.payment.resume.total);
    }
  }, [isRemaining]);

  const renderCharge = () => {
    return charge || price - concept > 0 ? (
      <>
        <>
          <div className="paymenttotalprice">
            <div className="paymenttotalpricetitle">{textRemaining}</div>
            <div className="paymenttotalpriceunit">{convertMoney(concept)}</div>
          </div>
          <div className="paymenttotalprice">
            <div className="paymenttotalpricetitle">
              {texts?.payment.resume.amount}
            </div>
            <div className="paymenttotalpriceunit">
              {convertMoney(Math.abs(concept - amount))}
            </div>
          </div>
        </>
      </>
    ) : (
      <div className="paymenttotalprice">
        <div className="paymenttotalpricetitle">{textRemaining}</div>
        <div className="paymenttotalpriceunit">{price}</div>
      </div>
    );
  };

  return (
    <>
      {isToBePaid ? (
        <>
          <div className="paymenttotalprice">
            <div className="paymenttotalpricetitle">{textForParcial}</div>
            <div
              className="paymenttotalpriceunit"
              style={{
                color: "#459A33",
              }}
            >
              {convertMoney(totalParcial)}
            </div>
          </div>
          <div className="paymenttotalprice">
            <div className="paymenttotalpricetitle">{textForPayment}</div>
            <div className="paymenttotalpriceunit">
              {convertMoney(Math.abs(totalParcial - amount))}
            </div>
          </div>
        </>
      ) : (
        renderCharge()
      )}
    </>
  );
};

export default PaymentTotalPrice;
