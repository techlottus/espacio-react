import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "../../Button/Button";
import {
  btnModalBack,
  btnModalNext,
  stepsCardResume,
  typesPaymentMethods,
} from "../../../constants/Payment.constant";
import { useDispatch, useSelector } from "react-redux";
import PaymentTotalPrice from "../../../flow/Payment/components/PaymentTotalPrice";
import { CardResume } from "../../Card/CardResume";
import "./ModalPaymentMethods.scss";
import {
  getBankDepositService,
  postStripePaymentService,
} from "../../../middlewares/paymentMiddleware";
import { useHistory } from "react-router";
import { sendInfoTM } from "../../../tagging/services/sendInfoTagManager";
import { stageThreeModalConfirmPaymentTag } from "../../../tagging/flows/paymentTag";
import { inputPaymentCharges } from "../../../constants/Payment.constant";
import { Input } from "../../../components/Input/Input";
import { useFormBuilder } from "../../../hooks/useForm";
import { Validators } from "react-reactive-form";
import { testPaymenTitle } from "../../../constants/test/testPayment";
import { convertMoney } from "../../../helpers/formatCurrency";
import { PaymentContext } from "../../../flow/Payment/PaymentContext";
import { setTotalPayable } from "../../../actions/paymentAction";

export const ModalPaymentMethods = ({ isShow, onClose, outside, state }) => {
  const { texts } = useSelector((state) => state.texts);
  const paymentStore = useSelector((state) => state.payment);
  const [isModal, setIsModal] = useState(false);

  const modalRef = useRef();

  const history = useHistory();

  const actionValid = () => {};

  const { form, setForm, next, setNext, nextBtn, setNextBtn, errorForms } =
    useFormBuilder(btnModalNext, actionValid);

  const [valuesForm, setValuesForm] = useState({
    name: null,
    value: null,
  });

  const { handleStateCardResume } = useContext(PaymentContext);

  const [options, setOptions] = useState([
    {
      id: "total",
      isActive: true,
    },
    {
      id: "parcial",
      isActive: false,
    },
  ]);

  useEffect(() => {
    setIsModal(isShow);
  }, [isShow]);

  useEffect(() => {
    if (valuesForm.name) {
      form.get(valuesForm.name).setValue(valuesForm.value);
      setValuesForm({
        name: null,
        value: null,
      });
    }
  }, [valuesForm, form]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isShow) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isShow]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        window.innerWidth > 991
      ) {
        outside();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [resume, setResume] = useState({});

  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  const [valueAmount, setValueAmount] = useState("");

  const handleInvoice = () => {
    return (
      <div className="modalinvoice">
        <p className="modaltextinvoice">
          {texts?.payment.modals.modalPaymentMethods.data.title}
        </p>
        <p className="modaltextstickinvoice">
          RFC:{paymentStore.selectInvoice.title}
        </p>
        {paymentStore.selectInvoice.description.map((invoice) => {
          return <p className="modaltextstickinvoice">{invoice}</p>;
        })}
      </div>
    );
  };

  useEffect(() => {
    if (paymentStore.selectConcept !== null) {
      setResume((state) => {
        return {
          ...state,
          label: paymentStore.selectConcept.description || "",
          title: paymentStore.selectConcept.title || "Total",
          subtitle: paymentStore.selectConcept.subtitle || "",
          price: parseFloat(paymentStore?.searchAmount?.originalAmount || 0),
        };
      });
    }
  }, [paymentStore.selectConcept, paymentStore?.searchAmount]);

  useEffect(() => {
    if (options[1].isActive && state === stepsCardResume.five) {
      let validations = paymentStore?.searchAmount?.minimumAmount
        ? [
            Validators.required,
            Validators.min(parseInt(paymentStore?.searchAmount?.minimumAmount)),
            Validators.max(parseInt(paymentStore?.searchAmount?.amount)),
          ]
        : [Validators.required];
      setForm({
        amount: [null, validations],
      });
    } else {
      setForm({
        amount: [null],
      });
    }
  }, [paymentStore?.selectMethod, options]);

  useEffect(() => {
    if (paymentStore?.searchAmount?.amount) {
      setTotal(parseFloat(paymentStore?.searchAmount?.amount));
    }
  }, [paymentStore?.searchAmount]);

  const handleModal = () => {
    return (
      <div className="modal-payment">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="title">
              {texts?.payment.modals.modalPaymentMethods.title}
            </div>
            <span
              className="material-icons icon"
              onClick={() => {
                sendInfoTM(window, stageThreeModalConfirmPaymentTag, "cerrar");
                onClose();
              }}
            >
              close
            </span>
          </div>
          <div className="modalbody">
            {paymentStore.selectInvoice !== null ? handleInvoice() : ""}
            <CardResume data={resume} />
            <PaymentTotalPrice
              price={
                paymentStore.selectConcept
                  ? convertMoney(parseFloat(paymentStore?.searchAmount?.amount))
                  : ""
              }
              isRemaining={
                paymentStore?.selectConcept?.price !==
                paymentStore?.selectConcept?.originalBalance
              }
              amount={parseFloat(paymentStore?.searchAmount?.amount)}
              isToBePaid={stepsCardResume.six === state}
              totalParcial={paymentStore.totalPayable}
            />
            {stepsCardResume.five === state ? (
              <div className="paymentchargeswrapper">
                <p className="paymentchargetitle">¿Como deseas pagar?</p>
                <p className="paymentchargesubtitle">
                  <span className="material-icons icon">report</span> Debes
                  pagar el importe total antes de la fecha de vencimiento
                </p>

                <div className="paymentchargeoption">
                  <div
                    className="paymentchargecheck"
                    onClick={() => {
                      setTotal(parseFloat(paymentStore?.searchAmount?.amount));
                      setOptions((state) => {
                        return state.map((e) => {
                          return {
                            ...e,
                            isActive: e?.id === "total",
                          };
                        });
                      });
                    }}
                  >
                    <input type="checkbox" checked={options[0].isActive} />
                    <label for="checkbox"></label>
                  </div>
                  <p className="paymentchargeoptiontext">Pago completo</p>
                  <p className="paymentchargeoptionprice">
                    {convertMoney(
                      parseFloat(paymentStore?.searchAmount?.amount)
                    )}
                  </p>
                </div>

                <div className="paymentchargeoptionline"></div>

                <div className="paymentchargeoption">
                  <div
                    className="paymentchargecheck"
                    onClick={() => {
                      setOptions((state) => {
                        return state.map((e) => {
                          return {
                            ...e,
                            isActive: e?.id === "parcial",
                          };
                        });
                      });
                    }}
                  >
                    <input type="checkbox" checked={options[1].isActive} />
                    <label for="checkbox"></label>
                  </div>
                  <p className="paymentchargeoptiontext">Parcialidad</p>
                </div>

                {options[1].isActive ? (
                  <div>
                    <p className="paymenttext">
                      {texts?.payment.modals.modalPaymentMethods.paymentText +
                        ", minimo a pagar es de " +
                        convertMoney(
                          parseInt(paymentStore?.searchAmount?.minimumAmount)
                        )}
                    </p>
                    <div className="paymentcharges">
                      <Input
                        data={inputPaymentCharges.data}
                        value={valueAmount}
                        //hasError={errorForms[inputNumberStudyRecord.data.name]}
                        //errorMessage={inputNumberStudyRecord.errorMessage}
                        eventKeyPress={(e) => {
                          setTotal(parseFloat(e.detail.value));
                          setValuesForm({
                            name: inputPaymentCharges.data.name,
                            value: e.detail.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="modalbtnsother">
              <div className="btn1">
                <Button
                  data={{
                    ...btnModalBack,
                    title: texts?.payment.btnModal.back,
                    isExpand: window.innerWidth < 991,
                    test: testPaymenTitle.btnModalBack,
                  }}
                  onClick={() => {
                    sendInfoTM(
                      window,
                      stageThreeModalConfirmPaymentTag,
                      "regresar"
                    );
                    onClose();
                  }}
                />
              </div>
              <div className="btn2">
                <Button
                  data={{
                    ...nextBtn,
                    title: texts?.payment.btnModal.next,
                    isExpand: window.innerWidth < 991,
                    test: testPaymenTitle.btnModalPayment,
                  }}
                  onClick={(optionsSel) => {
                    sendInfoTM(
                      window,
                      stageThreeModalConfirmPaymentTag,
                      "avanzar"
                    );
                    let amoutDeposit = 0;
                    switch (paymentStore.selectMethod) {
                      case typesPaymentMethods.deposit:
                        setTotal((state) => {
                          dispatch(setTotalPayable(state));
                          dispatch(
                            getBankDepositService(
                              paymentStore.selectConcept &&
                                paymentStore?.searchAmount?.transactionNumber,
                              paymentStore.selectConcept && state,
                              paymentStore.isInvoice,
                              paymentStore.selectInvoice &&
                                paymentStore.selectInvoice.id,
                              history
                            )
                          );
                          return state;
                        });

                        break;
                      case typesPaymentMethods.online:
                        if (state === stepsCardResume.five) {
                          setTotal((state) => {
                            dispatch(setTotalPayable(state));
                            return state;
                          });
                          handleStateCardResume(stepsCardResume.six);
                          history.push("/payment/card-online");
                        } else {
                          dispatch(
                            postStripePaymentService(
                              paymentStore.selectConcept,
                              paymentStore.cardId,
                              history,
                              paymentStore.isInvoice,
                              paymentStore.selectInvoice &&
                                paymentStore.selectInvoice.id
                            )
                          );
                        }

                        break;
                      default:
                        break;
                    }
                    onClose();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
