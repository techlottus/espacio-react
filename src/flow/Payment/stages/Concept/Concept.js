import React, { useState, useEffect, useContext } from "react";
import { CardDeatil } from "../../../../components/Card/CardDetail";
import {
  conceptToogle,
  stagesSteps,
  stepsCardResume,
} from "../../../../constants/Payment.constant";
import "./Concept.scss";
import { PaymentContext } from "../../PaymentContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setConcept,
  setErrorPayments,
  setIsInvoice,
  setMethod,
} from "../../../../actions/paymentAction";
import {
  getConceptsService,
  postConceptsService,
} from "../../../../middlewares/paymentMiddleware";
import { convertMoney } from "../../../../helpers/formatCurrency";
import { formatString } from "../../../../helpers/formatString";
import { typesRequestErrors } from "../../../../constants/error.constant";
import { ModalConceptDelete } from "../../../../components/Modal/ModalConceptDelete/ModalConceptDelete";
import { ModalToggle } from "../../../../components/Modal/ModalToggleConcept/ModalToggleConcept";
import { notiObs } from "../../../../observables/notificationObs";
import { typesNoti } from "../../../../types/typeNoti";
import { sendInfoTM } from "../../../../tagging/services/sendInfoTagManager";
import {
  modalWithoutInvoiceBtnPaymentTag,
  radioBtnConceptPaymentTag,
} from "../../../../tagging/flows/paymentTag";
import env from "../../../../enviroment/environment";
import { testPaymenTitle } from "../../../../constants/test/testPayment";

const Concept = ({ history }) => {
  const dispatch = useDispatch();
  const { texts } = useSelector((state) => state.texts);
  const paymentStore = useSelector((state) => state.payment);

  const {
    handleSteps,
    handleStateCardResume,
    isModalToggle,
    handleModalToggle,
    handleToggle,
  } = useContext(PaymentContext);

  const [listCards, setListCards] = useState([]);

  const handleCheck = (id) => {
    if (paymentStore?.concept !== null) {
      handleStateCardResume(stepsCardResume.second);
    }
    const list = listCards.map((card) => {
      return {
        ...card,
        checked: id === card.id,
      };
    });
    setListCards(list);
    const cardSelect = list.filter((card) => card.checked)[0];
    dispatch(setConcept(cardSelect));
  };

  const deleteConcept = (id) => {
    dispatch(postConceptsService(id));
  };

  const [isModalConcept, setIsModalConcept] = useState(false);

  const [isDeleteConcept, setIsDeleteConcept] = useState({
    valid: false,
    id: null,
  });

  useEffect(() => {
    if (isDeleteConcept.valid) {
      setIsModalConcept((state) => !state);
    }
  }, [isDeleteConcept]);

  const handleDelete = (id) => {
    setIsDeleteConcept({ valid: true, id });
  };

  useEffect(() => {
    if (paymentStore.concepts !== null) {
      const list = paymentStore.concepts.map((card, index) => {
        return {
          id: card.transactionNumber,
          title: formatString(card.conceptDescription),
          description: `${texts?.payment.concepts.description} ${card.dueDate}`,
          subtitle: card.periodDescription,
          price: card.balance,
          balance: convertMoney(card.balance),
          originalBalance: card.originalBalance,
          action: card.canBeCancelled ? texts?.payment.concepts.delete : null,
          date: card.dueDate,
          checked:
            (paymentStore.selectConcept !== null &&
              paymentStore.selectConcept.id === card.transactionNumber) ||
            (paymentStore.conceptDefault !== null &&
              card.transactionNumber === paymentStore.conceptDefault),
          label: `${texts?.payment.concepts.prefix}-${card.periodCode}`,
          texts: [
            {
              title:
                card.originalBalance !== card.balance
                  ? "Resta por pagar"
                  : "Total",
              total: card.balance,
              type: "normal",
            },
          ],
        };
      });
      setListCards(list);
      if (paymentStore.conceptDefault !== null) {
        const cardDefault = list.filter(
          (card) => card.id === paymentStore.conceptDefault
        )[0];
        if (cardDefault) {
          dispatch(setConcept(cardDefault));
        }
      }
    }
  }, [paymentStore.concepts]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(getConceptsService());
    handleSteps(stagesSteps.concept, false);
    if (env.mark === "utc") {
      handleToggle({
        ...conceptToogle,
        status: paymentStore.isInvoice,
      });
    } else {
      dispatch(setIsInvoice(false));
    }

    return () => {
      dispatch(setMethod(null));
      dispatch(setErrorPayments(typesRequestErrors.deleteConcept, false, null));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      paymentStore.errors &&
      paymentStore.errors[typesRequestErrors.deleteConcept].isError
    ) {
      notiObs.next({
        type: typesNoti.error,
        text: paymentStore.errors[typesRequestErrors.deleteConcept].msg,
      });
    }
  }, [paymentStore.errors]);

  return (
    <>
      <div className="payment-concept">
        <div className="paymentconcepts">
          {listCards.length > 0
            ? listCards.map((card, index) => {
                return (
                  <div className="paymentconcept" key={index + "divconcept"}>
                    <CardDeatil
                      key={index + "concept"}
                      data={{
                        ...card,
                        test: testPaymenTitle.cardConcept + index,
                      }}
                      onCheck={() => {
                        sendInfoTM(
                          window,
                          radioBtnConceptPaymentTag,
                          card?.conceptDescription
                        );
                        handleCheck(card.id);
                      }}
                      onAction={() => {
                        handleDelete(card.id);
                      }}
                    />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <ModalToggle
        isShow={isModalToggle}
        onCancel={() => {
          sendInfoTM(window, modalWithoutInvoiceBtnPaymentTag, "cancelar");
          handleToggle({
            ...conceptToogle,
            status: true,
          });
          handleModalToggle((state) => !state);
        }}
        outside={() => {
          handleModalToggle(false);
          handleToggle({
            ...conceptToogle,
            status: true,
          });
        }}
        onNext={() => {
          sendInfoTM(window, modalWithoutInvoiceBtnPaymentTag, "aceptar");
          handleModalToggle((state) => !state);
          handleToggle({
            ...conceptToogle,
            status: false,
          });
          dispatch(setIsInvoice(false));
        }}
      />
      <ModalConceptDelete
        isShow={isModalConcept}
        outside={() => setIsModalConcept(false)}
        onClose={() => {
          setIsModalConcept((state) => !state);
          setIsDeleteConcept({ valid: false, id: null });
        }}
        handleDelete={() => {
          setIsModalConcept((state) => !state);
          setIsDeleteConcept({ valid: false, id: null });
          deleteConcept(isDeleteConcept.id);
        }}
      />
    </>
  );
};

export default Concept;
