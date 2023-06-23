import React, { useState, useEffect } from "react";
import "./Payment.scss";
import { Stepper } from "../../components/Stepper/Stepper";
import {
  stepper,
  breadcrumb,
  stagesSteps,
  stepsCardResume,
  conceptToogle,
} from "../../constants/Payment.constant";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import PaymentRoutes from "../../routes/PaymentRoutes";
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import PaymentStick from "./components/PaymentStick";
import { PaymentContext } from "./PaymentContext";
import { typesRequestErrors } from "../../constants/error.constant";
import ScreenError from "../../shared/ScreenError/ScreenError";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPaymentStore,
  setConcept,
  setErrorPayments,
  setPathExitPayment,
} from "../../actions/paymentAction";
import { useHistory, useLocation } from "react-router";
import { ModalPaymentMethods } from "../../components/Modal/ModalPaymentMethods/ModalPaymentMethods";
import { ModalExit } from "../../components/Modal/ModalExit/ModalExit";
import { unblockPayment } from "../../helpers/unblock";
import { getTitleOfPayment } from "../../helpers/getTitlePayment";
import PaymentCardResumeDesk from "./components/PaymentCardResumeDesk";
import env from "../../enviroment/environment";
import { typesMark } from "../../types/typesMark";

const Payment = () => {
  const { texts } = useSelector((state) => state.texts);
  const history = useHistory();
  const location = useLocation();
  const [steps, setSteps] = useState({
    ...stepper,
    titles: [
      {
        text: texts?.payment.stepper.titleOne,
        disabled: false,
      },
      {
        text: texts?.payment.stepper.titleTwo,
        disabled: false,
      },
      {
        text: texts?.payment.stepper.titleThree,
        disabled: false,
      },
    ],
  });

  const [isModalToggle, setIsModalToggle] = useState(false);

  const [toogle, setToogle] = useState({
    ...conceptToogle,
    status: env.mark === typesMark.utc,
  });

  const [isModalExit, setIsModalExit] = useState({
    isShow: false,
    unblock: null,
  });

  const [isModalPayment, setIsModalPayment] = useState(false);
  const [stateCardResume, setStateCardResume] = useState(stepsCardResume.first);

  const dispatch = useDispatch();

  const handleAftherToPayment = (isInvoice) => {
    setSteps({
      ...stepper,
      initCount: 2,
      titles: [
        {
          text: texts?.payment.stepper.titleTwo,
          disabled: !isInvoice,
        },
        {
          text: texts?.payment.stepper.titleThree,
          disabled: false,
        },
        {
          text: "Pago con tarjeta",
          disabled: false,
        },
      ],
      focus: 2,
    });
  };

  const handleBeforeToPayment = (isInvoice) => {
    setSteps({
      ...stepper,
      initCount: 1,
      titles: [
        {
          text: texts?.payment.stepper.titleOne,
          disabled: false,
        },
        {
          text: texts?.payment.stepper.titleTwo,
          disabled: !isInvoice,
        },
        {
          text: texts?.payment.stepper.titleThree,
          disabled: false,
        },
      ],
      focus: 2,
    });
  };

  const handleSteps = (focus, isInvoice) => {
    if (isInvoice) {
      const titleCopy = steps.titles.map((title, index) => {
        return {
          ...title,
          disabled: index === stagesSteps.taxData,
        };
      });
      setSteps({
        ...steps,
        focus,
        titles: titleCopy,
      });
    } else {
      const titleCopy = steps.titles.map((title, index) => {
        return {
          ...title,
          disabled: false,
        };
      });
      setSteps({
        ...steps,
        focus,
        titles: titleCopy,
      });
    }
  };

  const paymentStore = useSelector((state) => state.payment);

  const [isError, setIsError] = useState({
    isError: false,
    msg: "",
  });

  useEffect(() => {
    if (
      paymentStore.errors &&
      paymentStore.errors[typesRequestErrors.getConcepts]?.isError
    ) {
      setIsError({
        isError: true,
        msg: paymentStore.errors[typesRequestErrors.getConcepts]?.msg,
      });
    } else if (
      paymentStore.errors &&
      paymentStore.errors[typesRequestErrors.emptyConcepts]?.isError
    ) {
      setIsError({
        isError: true,
        msg: paymentStore.errors[typesRequestErrors.emptyConcepts]?.msg,
      });
    } else {
      setIsError({
        isError: false,
        msg: null,
      });
    }
  }, [paymentStore.errors]);

  useEffect(() => {
    let unblock = history.block((location) => {
      if (unblockPayment(location.pathname)) {
        dispatch(setPathExitPayment(location.pathname));
        setIsModalExit({
          isShow: true,
          unblock,
        });
        return false;
      }

      return true;
    });

    return () => {
      dispatch(setErrorPayments(typesRequestErrors.getConcepts, false, null));
      dispatch(setErrorPayments(typesRequestErrors.emptyConcepts, false, null));
      dispatch(resetPaymentStore());
      unblock();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderSuccess = () => {
    return (
      <div className="paymentcontentchild">
        <div className="paymentsteps">
          <Stepper data={steps} />
        </div>
        <div className="paymentcontent">
          <PaymentRoutes />
        </div>
      </div>
    );
  };

  const renderError = (msg) => {
    return (
      <div style={{ marginTop: "-50px" }}>
        <ScreenError msg={msg} />
      </div>
    );
  };

  const handleStateCardResume = (state) => {
    setStateCardResume(state);
  };

  const handleModalToggle = () => {
    setIsModalToggle((state) => !state);
  };

  const handleToggle = (toogle) => {
    setToogle({ ...toogle });
  };

  const onItem = (e) => {
    if (e.detail === "/") {
      history.push(e.detail);
    }
  };

  const onBack = (e) => {
    history.push("/");
  };

  return (
    <>
      <HeaderApp />
      <PaymentContext.Provider
        value={{
          isModalToggle,
          toogle,
          stateCardResume,
          handleSteps,
          handleBeforeToPayment,
          handleAftherToPayment,
          handleStateCardResume,
          setIsModalPayment,
          handleToggle,
          handleModalToggle,
        }}
      >
        <div className="payment-container">
          <div className="paymentstages">
            <div className="back">
              <Breadcrumb
                data={{
                  ...breadcrumb,
                  textItems: [
                    {
                      ...breadcrumb.textItems[0],
                      text: texts?.payment.breadcrumb.breadOne,
                    },
                    {
                      ...breadcrumb.textItems[1],
                      text: texts?.payment.breadcrumb.breadTwo,
                    },
                  ],
                  icon: texts?.payment.breadcrumb.icon,
                }}
                onItem={onItem}
                onBack={onBack}
              />
            </div>
            <p className="paymenttitle">
              {getTitleOfPayment(
                location.pathname,
                texts?.payment?.stagesTitles
              )}
            </p>
            <div className="paymentcontent">
              {isError.isError ? renderError(isError.msg) : renderSuccess()}
            </div>
            <div className="paymentresume">
              {/* <PaymentResumeDesktop /> */}
              <PaymentCardResumeDesk />
            </div>
          </div>
          <PaymentStick />
        </div>
        <ModalPaymentMethods
          isShow={isModalPayment}
          state={stateCardResume}
          onClose={() => {
            setIsModalPayment((state) => !state);
          }}
          outside={() => setIsModalPayment(false)}
        />
        <ModalExit
          isShow={isModalExit.isShow}
          onClose={() => {
            setIsModalExit((state) => {
              return {
                ...state,
                isShow: false,
              };
            });
          }}
          onNext={() => {
            isModalExit.unblock();
            setIsModalExit({
              isShow: false,
              unblock: null,
            });
            setPathExitPayment(null);
            setConcept(null);
            history.push(paymentStore.pathExit);
          }}
          flow={"payment"}
        />
      </PaymentContext.Provider>
    </>
  );
};

export default Payment;
