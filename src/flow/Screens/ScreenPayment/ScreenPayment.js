import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getImageOfAssetsMark } from "../../../helpers/getImages";
import "./ScreenPayment.scss";

const ScreenPayment = () => {
  const history = useHistory();
  const { texts } = useSelector(state => state.texts);

  const query = new URLSearchParams(useLocation().search);

  const [isPaymentMsg, setIsPaymentMsg] = useState("");

  useEffect(() => {
    const status = query.get("status");
    if (status === "pending") { 
      setIsPaymentMsg(texts.screen.payment.pending);
    } else if (status === "error") {
      setIsPaymentMsg(texts.screen.payment.error);
    } else if (status === "success") {
      setIsPaymentMsg(texts.screen.payment.success);
    } else {
      history.push("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="screenpayment-container">
        <div className="imgscreen">
          <img
            src={getImageOfAssetsMark(texts?.screen?.images?.paymentEmpty)}
            className="imgpayment"
            alt="img-success"
          />
        </div>
        <p className="msgpayment">{isPaymentMsg}</p>
      </div>
    </>
  );
};

export default ScreenPayment;
