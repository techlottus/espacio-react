import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { setCardId, setErrorPayments } from "../../../../actions/paymentAction";
import { Button } from "../../../../components/Button/Button";
import CreditPaymentCard from "../../../../components/Card/CreditPaymentCard";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import FormCreditCard from "../../components/FormCreditCard/FormCreditCard";
import { ModalCardPaymentDelete } from "../../../../components/Modal/ModalCardPaymentDelete/ModalCardPaymentDelete";
import { typesRequestErrors } from "../../../../constants/error.constant";
import {
  addCardOnlinePaymentBtn,
  backCardOnlinePaymentBtn,
  stepsCardResume,
} from "../../../../constants/Payment.constant";
import { getImageOfAssetsMark } from "../../../../helpers/getImages";
import {
  deleteCreditCardService,
  getCreditCardsService,
} from "../../../../middlewares/paymentMiddleware";
import { notiObs } from "../../../../observables/notificationObs";
import { typesNoti } from "../../../../types/typeNoti";
import { PaymentContext } from "../../PaymentContext";
import "./CardOnlinePayment.scss";
import { testPaymenTitle } from "../../../../constants/test/testPayment";

const CardOnlinePayment = () => {
  const { handleBeforeToPayment,handleStateCardResume } = useContext(PaymentContext);
  const [creditForm, setCreditForm] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { texts } = useSelector((state) => state.texts);
  const paymentStore = useSelector((state) => state.payment);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState({
    isError: false,
    msg: null,
  });

  useEffect(() => {
    if (paymentStore.selectConcept != null) {
      dispatch(getCreditCardsService());
      window.scrollTo(0, 0);
    } else {
      history.replace("/payment/concept");
    }

    return () => {
      dispatch(setCardId(null))
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setCards(paymentStore.cards);
  }, [paymentStore.cards]);

  const [isModalCard, setIsModalCard] = useState({ valid: false, id: null });

  const handleAction = (attr) => {
    if (attr.type === "delete") {
      setIsModalCard({ valid: true, id: attr.id });
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteCreditCardService(id));
  };

  useEffect(() => {
    if (
      paymentStore.errors &&
      paymentStore.errors[typesRequestErrors.deleteCreditCard]?.isError
    ) {
      notiObs.next({
        type: typesNoti.error,
        text: texts.payment.errors.deleteCard,
      });
      dispatch(setErrorPayments(
        paymentStore.errors[typesRequestErrors.deleteCreditCard],
        false,
        null
      ));
    }
    if (
      paymentStore.errors &&
      paymentStore.errors[typesRequestErrors.getCreditCards]?.isError
    ) {
      setError({
        isError: paymentStore.errors[typesRequestErrors.getCreditCards].isError,
        msg: paymentStore.errors[typesRequestErrors.getCreditCards].msg,
      });
      dispatch(setErrorPayments(
        paymentStore.errors[typesRequestErrors.getCreditCards],
        false,
        null
      ))
    }
    if (
      paymentStore.errors &&
      paymentStore.errors[typesRequestErrors.postCreditCard].isError
    ) {
      notiObs.next({
        type: typesNoti.error,
        text: texts.payment.errors.postCreditCard,
      });
      dispatch(setErrorPayments(
        paymentStore.errors[typesRequestErrors.postCreditCard],
        false,
        null
      ));
    }
  }, [paymentStore.errors]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleWithCards = () => {
    return cards !== null && cards.length > 0 ? (
      <>
        <div className="itemscardonlinepayment">
          {cards.map((card, i) => {
            return (
              <div
                className="itemcardonlinepayment"
                key={"creditpaymentdiv" + i}
              >
                <CreditPaymentCard
                  key={"creditpayment" + i}
                  data={{
                    ...card,
                    test: testPaymenTitle.cardCredit+i
                  }}
                  onActions={(e) => {
                    handleAction(e.detail);
                  }}
                  onCheck={(e) => {
                    setCards((cards) => {
                      return cards.map((card) => {
                        return {
                          ...card,
                          actions: card.id === e.detail.id ? [""] : ["delete"],
                          checked: card.id === e.detail.id,
                        };
                      });
                    });
                    const type = cards.filter((card) => card.id === e.detail.id)[0].type;
                    dispatch(setCardId({
                      id: e.detail.id,
                      type
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="btnscardonlinepayment">
          <div className="btncardonlinepayment">
            <Button
              data={{
                ...addCardOnlinePaymentBtn,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                setCreditForm(true);
              }}
            />
          </div>
          <div className="btncardonlinepayment">
            <Button
              data={{
                ...backCardOnlinePaymentBtn,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                handleStateCardResume(stepsCardResume.five)
                history.push('/payment/methods')
              }}
            />
          </div>
        </div>
        <ModalCardPaymentDelete
          isShow={isModalCard.valid}
          onClose={() => {
            setIsModalCard((state) => !state);
          }}
          outside={() => setIsModalCard(false)}
          handleDelete={() => {
            handleDelete(isModalCard.id);
            setIsModalCard({ valid: false, id: null });
          }}
        />
      </>
    ) : (
      handleImageCenter(
        false,
        getImageOfAssetsMark(texts?.payment?.images?.emptyFirst),
        texts?.payment?.errors?.emptyCreditCards 
      )
    );
  };

  const handleImageCenter = (isDisabled, img, title) => {
    return (
      <div className="emptycardonlinepayment">
        <div className="emptyimagecardonlinepayment">
          <EmptyState img={img} title={title} button={null} />
        </div>
        <div className="emptybtnscardonlinepayment">
          <div className="emptybtncardonlinepayment">
            <Button
              data={{
                ...addCardOnlinePaymentBtn,
                isExpand: window.innerWidth < 991,
                disabled: isDisabled,
              }}
              onClick={() => {
                setCreditForm(true);
              }}
            />
          </div>
          <div className="emptybtncardonlinepayment">
            <Button
              data={{
                ...backCardOnlinePaymentBtn,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                handleBeforeToPayment(paymentStore.isInvoice);
                handleStateCardResume(stepsCardResume.five)
                history.push("/payment/methods");
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleView = () => {
    return !error.isError
      ? handleWithCards()
      : handleImageCenter(
          true,
          getImageOfAssetsMark(texts?.payment?.images?.emptyError),
          texts?.payment?.errors?.getCreditCards
        );
  };

  return (
    <>
      <div className="cardonline-payment">{handleView()}</div>
      <FormCreditCard
        isShow={creditForm}
        onClose={() => {
          setCreditForm(false);
        }}
      />
    </>
  );
};

export default CardOnlinePayment;
