import React, { useContext, useEffect, useState } from "react";
import "./TaxData.scss";
import FormsTax from "./FormsTax/FormsTax";
import ListTax from "./ListTax/ListTax";
import { stagesSteps, stepsCardResume } from "../../../../constants/Payment.constant";
import { PaymentContext } from "../../PaymentContext";
import { useSelector, useDispatch } from "react-redux";
import { setInvoices, setMethod } from "../../../../actions/paymentAction";
const TaxData = ({ history }) => {
  const paymentStore = useSelector((state) => state.payment);

  const dispatch = useDispatch();

  const { handleSteps,handleStateCardResume } = useContext(PaymentContext);

  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    if(paymentStore.selectConcept !== null) {
      handleSteps(stagesSteps.taxData, false);
      window.scrollTo(0, 0);
    } else {
      handleStateCardResume(stepsCardResume.second)
      history.replace('/payment/concept')
    }

    return () => {
      dispatch(setMethod(null));
      dispatch(setInvoices(null));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeView = () => {
    window.scrollTo(0, 0);
    setIsForm((prevState) => !prevState);
  };
  return (
    <>
      <div className="taxdata">
        {isForm ? (
          <FormsTax cancelForm={handleChangeView} saveForm={() => {
            handleChangeView();
            handleStateCardResume(stepsCardResume.fourth)
          }} />
        ) : (
          <ListTax
            addForm={handleChangeView}
            history={history}
          />
        )}
      </div>
    </>
  );
};

export default TaxData;
