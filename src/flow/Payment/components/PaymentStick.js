import React, {  useContext, useState } from "react";
import { useSelector } from "react-redux";
import "./PaymentStick.scss";
import PaymentCardResumeDesk from "./PaymentCardResumeDesk";
import { PaymentContext } from "../PaymentContext";
import { stepsCardResume } from "../../../constants/Payment.constant";

const PaymentStick = () => {
  const [isShow, setIsShow] = useState(false);
  const paymentStore = useSelector((state) => state.payment);
  const {stateCardResume} = useContext(PaymentContext)

  const calcHeight = () => {
    return  !isShow
    ? paymentStore.selectConcept !== null
      ? stateCardResume === stepsCardResume.second ? '300px': (paymentStore?.searchAmount?.amountAdd ? '300px': '250px')
      : "120px"
    : "520px";
  }

  return (
    <>
      <div
        className="paymentstick-container"
        style={{
          height:calcHeight()
        }}
      >
        <span
          className="material-icons icon"
          onClick={() => {
            setIsShow((state) => !state);
          }}
        >
          {isShow ? "keyboard_arrow_down" : "expand_less"}
        </span>
        <PaymentCardResumeDesk
          isMobile={true}
          isShow={isShow}
        />
      </div>
    </>
  );
};

export default PaymentStick;
