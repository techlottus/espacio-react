import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { setIsInvoice } from "../../../actions/paymentAction";
import { Button } from "../../../components/Button/Button";
import { CardResume } from "../../../components/Card/CardResume";
import { Feedback } from "../../../components/Feedback/Feedback";
import { Toggle } from "../../../components/Toggle/Toggle";
import {
  conceptToogle,
  nextBtn,
  paymentBtnResume,
  paymentCardFeedback,
  paymentResumeNextBtn,
  stepsCardResume,
  typesPaymentMethods,
  ulaFededbackInvoice,
} from "../../../constants/Payment.constant";
import { testPaymenTitle } from "../../../constants/test/testPayment";
import env from "../../../enviroment/environment";
import { convertMoney } from "../../../helpers/formatCurrency";
import { getImageOfAssets } from "../../../helpers/getImages";
import {
  stageThreeBtnNextPaymentTag,
  switchInvoicePaymentTag,
} from "../../../tagging/flows/paymentTag";
import { sendInfoTM } from "../../../tagging/services/sendInfoTagManager";
import { typesMark } from "../../../types/typesMark";
import { BtnPaymentValidator } from "../../../validators/payment/paymentValidator";
import { PaymentContext } from "../PaymentContext";
import { getStepActionPayment } from "../utils/actionPayment";
import "./PaymentCardResumeDesk.scss";
import PaymentTotalPrice from "./PaymentTotalPrice";
import SecurePayment from "./SecurePayment";

const PaymentCardResumeDesk = React.memo(
  ({ isMobile = false, isShow = false }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { texts } = useSelector((state) => state.texts);
    const paymentStore = useSelector((state) => state.payment);
    const [priceAmount, setPriceAmount] = useState("");
    const {
      handleModalToggle,
      toogle,
      stateCardResume,
      handleStateCardResume,
      handleToggle,
      setIsModalPayment: handleIsModalPayment,
    } = useContext(PaymentContext);
    const location = useLocation();

    const [resume, setResume] = useState({});

    const [next, setNext] = useState(false);

    const [isRemaining, setIsRamaining] = useState(false);

    const [paymentBtn, setBtnPayment] = useState({
      ...paymentBtnResume,
      title: texts?.payment.resume.payment,
      disabled: false,
    });

    const [nextBtnInvoice, setNextBtnInvoice] = useState({
      ...nextBtn,
      disabled: true,
    });

    const [existAmount, setExistAmount] = useState(0);
    const [existConcept, setExistConcept] = useState(0);
    const [existCharge, setExistCharge] = useState(false);

    useEffect(() => {
      if (next) {
        const newStep = getStepActionPayment(
          stateCardResume,
          toogle.status,
          history,
          paymentStore.selectMethod,
          handleIsModalPayment
        );
        handleStateCardResume(newStep);
        setNext(false);
      }
    }, [stateCardResume, next, toogle.status, paymentStore.selectMethod]);

    useEffect(() => {
      if (paymentStore?.searchAmount?.amount) {
        setPriceAmount(
          convertMoney(parseFloat(paymentStore.searchAmount.amount))
        );
        setExistAmount(parseFloat(paymentStore.searchAmount.amount));
        setExistCharge(paymentStore.searchAmount.amountAdd);
      }
    }, [paymentStore.searchAmount]);

    useEffect(() => {
      handleStateCardResume(stepsCardResume.first);
    }, []);

    useEffect(() => {
      setNextBtnInvoice({
        ...nextBtnInvoice,
        disabled: !paymentStore.selectInvoice,
      });
    }, [paymentStore.selectInvoice]);

    useEffect(() => {
      if (paymentStore.selectConcept !== null) {
        sendInfoTM(window, stageThreeBtnNextPaymentTag);
        setResume((state) => {
          return {
            ...state,
            label: paymentStore.selectConcept.description || "",
            title: paymentStore.selectConcept.title || "",
            subtitle: paymentStore.selectConcept.subtitle || "",
            price: paymentStore.selectConcept.originalBalance,
            isTotal: false,
          };
        });
        setIsRamaining(
          paymentStore?.selectConcept?.price !==
            paymentStore?.selectConcept?.originalBalance
        );
        setExistConcept(parseFloat(paymentStore?.selectConcept?.price));
      }
    }, [
      paymentStore.selectConcept,
      paymentStore.searchAmount,
      stateCardResume,
    ]);
    useEffect(() => {
      if (paymentStore.selectMethod !== null) {
        setBtnPayment((state) => {
          return {
            ...state,
            disabled: BtnPaymentValidator(
              location.pathname,
              paymentStore.cardId !== null
            ),
            title:
              paymentStore.selectMethod === typesPaymentMethods.deposit
                ? texts?.payment.actions.download
                : texts?.payment.actions.payment,
          };
        });
      } else {
        setBtnPayment((state) => {
          return {
            ...state,
            disabled: true,
          };
        });
      }
    }, [paymentStore.selectMethod, location.pathname, paymentStore.cardId]);

    const stepsSelectSwitch = (step) => {
      switch (step) {
        case stepsCardResume.first:
          return (
            <div className="paymentcardresumeselect">
              <img
                src={getImageOfAssets(
                  texts?.payment?.resume?.imageSelectNotice
                )}
                alt="card-icon"
                className="paymentcardresumeicon"
              />
              <p>{texts?.payment?.resume?.selectNotice}</p>
            </div>
          );
        case stepsCardResume.second:
          return (
            <>
              {isMobile ? (
                <>
                  <p className="paymentcardresumetitle">
                    {texts?.payment?.resume?.resumeText}
                  </p>
                  {isShow ? (
                    <div className="paymentcardresumecard">
                      <CardResume data={resume} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="paymentresumetotal">
                    <PaymentTotalPrice
                      price={paymentStore?.selectConcept?.balance || ""}
                      isRemaining={isRemaining}
                    />
                  </div>
                  {env.mark === typesMark.utc ? (
                    <div className="paymentcardresumetoggle">
                      {isShow ? (
                        <p className="paymentcardresumenotice">
                          {texts?.payment?.resume?.toggleNotice}
                        </p>
                      ) : (
                        ""
                      )}
                      <div className="paymentcardresumeinvoice">
                        <Toggle
                          data={{
                            ...toogle,
                            test: testPaymenTitle.toogle,
                          }}
                          onSwitch={(e) => {
                            sendInfoTM(
                              window,
                              switchInvoicePaymentTag,
                              e.detail ? "on" : "off"
                            );
                            if (e.detail) {
                              handleToggle({
                                ...conceptToogle,
                                status: true,
                              });
                              dispatch(setIsInvoice(true));
                            } else {
                              handleModalToggle();
                            }
                          }}
                        />
                        <span className="paymentcardresumeinvoicetext">
                          {texts?.payment?.resume?.invoiceText}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="ulatext">
                      <Feedback
                        data={ulaFededbackInvoice}
                        html={() => {
                          return (
                            <div>
                              <p>{texts?.payment.ulaFeedbackText}</p>
                            </div>
                          );
                        }}
                      />
                    </div>
                  )}
                  <div className="paymentcardresumebtn">
                    <Button
                      data={{
                        ...paymentResumeNextBtn,
                        isExpand: true,
                        test: testPaymenTitle.btnNextConcept,
                      }}
                      onClick={() => {
                        setNext(true);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="paymentcardresumetitle">
                    {texts?.payment?.resume?.resumeText}
                  </p>
                  <div className="paymentcardresumecard">
                    <CardResume data={resume} />
                  </div>
                  <div className="paymentresumetotal">
                    <PaymentTotalPrice
                      price={paymentStore?.selectConcept?.balance || ""}
                      isRemaining={isRemaining}
                    />
                  </div>
                  {env.mark === typesMark.utc ? (
                    <div className="paymentcardresumetoggle">
                      <p className="paymentcardresumenotice">
                        {texts?.payment?.resume?.toggleNotice}
                      </p>
                      <div className="paymentcardresumeinvoice">
                        <Toggle
                          data={{
                            ...toogle,
                            test: testPaymenTitle.toogle,
                          }}
                          onSwitch={(e) => {
                            sendInfoTM(
                              window,
                              switchInvoicePaymentTag,
                              e.detail ? "on" : "off"
                            );
                            if (e.detail) {
                              handleToggle({
                                ...conceptToogle,
                                status: true,
                              });
                              dispatch(setIsInvoice(true));
                            } else {
                              handleModalToggle();
                            }
                          }}
                        />
                        <span className="paymentcardresumeinvoicetext">
                          {texts?.payment?.resume?.invoiceText}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="ulatext">
                      <Feedback
                        data={ulaFededbackInvoice}
                        html={() => {
                          return (
                            <div>
                              <p>{texts?.payment.ulaFeedbackText}</p>
                            </div>
                          );
                        }}
                      />
                    </div>
                  )}
                  <div className="paymentcardresumebtn">
                    <Button
                      data={{
                        ...paymentResumeNextBtn,
                        test: testPaymenTitle.btnNextConcept,
                      }}
                      onClick={() => {
                        setNext(true);
                      }}
                    />
                  </div>
                </>
              )}
            </>
          );

        case stepsCardResume.third:
          return (
            <>
              {isMobile ? (
                <>
                  <p className="paymentcardresumetitle">
                    {texts?.payment?.resume?.resumeText}
                  </p>
                  {isShow ? (
                    <div className="paymentcardresumecard">
                      <CardResume data={resume} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="paymentresumetotal">
                    <PaymentTotalPrice
                      price={paymentStore?.selectConcept?.balance || ""}
                      isRemaining={isRemaining}
                    />
                  </div>
                  <div className="paymentcardresumefeedback">
                    <Feedback
                      data={paymentCardFeedback}
                      html={() => {
                        return (
                          <div>
                            <p>{texts?.payment?.resume?.feedbackNotice}</p>
                          </div>
                        );
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="paymentcardresumetitle">
                    {texts?.payment?.resume?.resumeText}
                  </p>
                  <div className="paymentcardresumecard">
                    <CardResume data={resume} />
                  </div>
                  <div className="paymentresumetotal">
                    <PaymentTotalPrice
                      price={paymentStore?.selectConcept?.balance || ""}
                      isRemaining={isRemaining}
                    />
                  </div>
                  <div className="paymentcardresumefeedback">
                    <Feedback
                      data={paymentCardFeedback}
                      html={() => {
                        return (
                          <div>
                            <p>{texts?.payment?.resume?.feedbackNotice}</p>
                          </div>
                        );
                      }}
                    />
                  </div>
                </>
              )}
            </>
          );

        case stepsCardResume.fourth:
          return (
            <>
              {isMobile ? (
                <>
                  <p className="paymentcardresumetitle">
                    {texts?.payment?.resume?.resumeText}
                  </p>
                  {isShow ? (
                    <div className="paymentcardresumecard">
                      <CardResume data={resume} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="paymentresumetotal">
                    <PaymentTotalPrice
                      price={paymentStore?.selectConcept?.balance || ""}
                      isRemaining={isRemaining}
                    />
                  </div>
                  <div className="paymentcardresumebtn">
                    <Button
                      data={{
                        ...nextBtnInvoice,
                        isExpand: true,
                        test: testPaymenTitle.btnNextInvoice,
                      }}
                      onClick={() => {
                        setNext(true);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="paymentcardresumetitle">
                    {texts?.payment?.resume?.resumeText}
                  </p>
                  <div className="paymentcardresumecard">
                    <CardResume data={resume} />
                  </div>
                  <div className="paymentresumetotal">
                    <PaymentTotalPrice
                      price={paymentStore?.selectConcept?.balance || ""}
                      isRemaining={isRemaining}
                    />
                  </div>
                  <div className="paymentcardresumebtn">
                    <Button
                      data={{
                        ...nextBtnInvoice,
                        test: testPaymenTitle.btnNextInvoice,
                      }}
                      onClick={() => {
                        setNext(true);
                      }}
                    />
                  </div>
                </>
              )}
            </>
          );

        case stepsCardResume.five:
        case stepsCardResume.six:
          return (
            <>
              {isMobile ? (
                <>
                  <p className="paymentcardresumetitle">
                    {texts?.payment?.resume?.resumeText}
                  </p>
                  {isShow ? (
                    <>
                      <div className="paymentcardresumecard">
                        <CardResume data={resume} />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <div className="paymentresumetotal">
                    <PaymentTotalPrice
                      price={paymentStore?.selectConcept?.balance || ""}
                      isRemaining={isRemaining}
                      concept={existConcept}
                      charge={existCharge}
                      amount={existAmount}
                      isToBePaid={stepsCardResume.six === step}
                      totalParcial={paymentStore.totalPayable}
                    />
                  </div>
                  <div className="paymentcardresumebtn">
                    <Button
                      data={{
                        ...paymentBtn,
                        isExpand: true,
                        test: testPaymenTitle.btnNextPayment,
                      }}
                      onClick={() => {
                        setNext(true);
                      }}
                    />
                  </div>
                  {isShow ? (
                    <div className="paymentcardresumesecure">
                      <SecurePayment />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <>
                  <p className="paymentcardresumetitle">
                    {texts?.payment?.resume?.resumeText}
                  </p>
                  <div className="paymentcardresumecard">
                    <CardResume data={resume} />
                  </div>
                  <div className="paymentresumetotal">
                    <PaymentTotalPrice
                      isRemaining={isRemaining}
                      price={priceAmount}
                      concept={existConcept}
                      charge={existCharge}
                      amount={existAmount}
                      isToBePaid={stepsCardResume.six === step}
                      totalParcial={paymentStore.totalPayable}
                    />
                  </div>
                  <div className="paymentcardresumebtn">
                    <Button
                      data={{
                        ...paymentBtn,
                        test: testPaymenTitle.btnNextPayment,
                      }}
                      onClick={() => {
                        setNext(true);
                      }}
                    />
                  </div>
                  <div className="paymentcardresumesecure">
                    <SecurePayment />
                  </div>
                </>
              )}
            </>
          );

        default:
          break;
      }
    };

    return (
      <>
        <div className={`paymentcardresumedesk ${isMobile && "-ismobile"}`}>
          {stepsSelectSwitch(stateCardResume)}
        </div>
      </>
    );
  }
);

export default PaymentCardResumeDesk;
