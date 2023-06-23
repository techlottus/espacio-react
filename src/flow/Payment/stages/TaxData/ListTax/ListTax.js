import React, { useContext, useEffect, useState } from "react";
import { CardInvoice } from "../../../../../components/Card/CardInvoice";
import {
  optionsStates,
  listTaxLink,
  backBtn,
  optionCfdi,
  feedbackAlertError,
  stepsCardResume,
  optionRegime,
} from "../../../../../constants/Payment.constant";
import "./ListTax.scss";
import { Link } from "../../../../../components/Link/Link";
import { Button } from "../../../../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditForm,
  setErrorPayments,
  setInvoice,
} from "../../../../../actions/paymentAction";
import {
  deleteInvoicesService,
  getInvoicesService,
  getTaxRegimeService,
} from "../../../../../middlewares/paymentMiddleware";
import { typesRequestErrors } from "../../../../../constants/error.constant";
import { Feedback } from "../../../../../components/Feedback/Feedback";
import { formatString } from "../../../../../helpers/formatString";
import { ModalInvoiceDelete } from "../../../../../components/Modal/ModalInvoiceDelete/ModalInvoiceDelete";
import { notiObs } from "../../../../../observables/notificationObs";
import { typesNoti } from "../../../../../types/typeNoti";
import { sendInfoTM } from "../../../../../tagging/services/sendInfoTagManager";
import { actionsRfcPaymentTag, modalWithoutInvoiceBtnPaymentTag, stageTwoBtnBackPaymentTag, stageTwoBtnNextPaymentTag } from "../../../../../tagging/flows/paymentTag";
import { PaymentContext } from "../../../PaymentContext";
import { testPaymenTitle } from "../../../../../constants/test/testPayment";
import { getTaxRegime } from "../../../../../services/payment/invoiceServices";


const ListTax = ({ addForm, history }) => {
  const { texts } = useSelector(state => state.texts);
  const [listCards, setListCards] = useState([]);
  const [isModalInvoice, setIsModalInvoice] = useState(false);
  const {handleStateCardResume} = useContext(PaymentContext);

  const [isNextLink, setIsNextLink] = useState(false)

  const dispatch = useDispatch();

  const paymentStore = useSelector((state) => state.payment);

  const [isErrorGetInvoices, setIsErrorGetInvoices] = useState({
    isError: false,
    msg: "",
  });

  useEffect(() => {
    let selectInvoiceId = null;
    if (paymentStore.invoices !== null && paymentStore.invoices.length > 0) {
      const list = paymentStore.invoices.map((card) => {
        const stateName =
          card.address && card.address.state
            ? optionsStates.filter(
                (state) => state.value === card.address.state
              )[0].text
            : "";
        const direction = card.address
          ? `${
              card.address.street != null
                ? `${texts?.payment.cardInvoice.address} ${formatString(card.address.street)},`
                : ""
            } ${
              card.address.neighborhood != null
                ? `${formatString(card.address.neighborhood)},`
                : ""
            } ${
              card.address.city != null
                ? `${formatString(card.address.city)},`
                : ""
            } ${
              card.address.state != null ? `${formatString(stateName)},` : ""
            } ${
              card.address.zipCode != null
                ? `${formatString(card.address.zipCode)},`
                : ""
            }`
          : "";
        const email = card.email ? `${texts?.payment.cardInvoice.email} ${card.email}` : "";
        const cfdi = card.cfdiUsage
        ? optionCfdi.filter((option) => option.value === card.cfdiUsage)[0]?.text : "";
        // const regime = card.regime ? optionRegime.filter((option) => option.value === card.regime)[0]?.text : "";
        const businessName = card.businessName
          ? `${texts?.payment.cardInvoice.businessName} ${card.businessName}`
          : "";
        const fullName = card.fullName ? `${texts?.payment.cardInvoice.name}: ${card.fullName}` : "";
        const trimDirection = direction.trim();
        let des = [
          `${texts?.payment.cardInvoice.curp} ${card.curp}`,
          `${texts?.payment.cardInvoice.cfdi} ${cfdi}`,
          // `${texts?.payment.cardInvoice.regime} ${regime}`,
          businessName,
          fullName,
          trimDirection,
          email,
        ];
        let newDes = des.filter((item) => item);
        if (card.default) {
          selectInvoiceId = card.id;
        }
        return {
          id: card.id,
          title: card.rfc.toUpperCase(),
          description: newDes,
          checked: card.default,
          actions: card.default ? ["edit"] : ["delete", "edit"],
          userId: card.userId,
          email: card.email,
          isFeedback: !card?.flagRegime,
          disabled: !card?.flagRegime 
        };
      });
      if (selectInvoiceId !== null) {
        const invoice = list.filter(
          (invoice) => invoice.id === selectInvoiceId
        )[0];
        dispatch(setInvoice(invoice));
      } else {
        dispatch(setInvoice(null));
      }
      setListCards(list);
    }
    if (paymentStore.invoices && paymentStore.invoices.length === 0) {
      addForm();
    }
  }, [paymentStore.invoices]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCheck = (id) => {
    let cardSelect = null;
    setListCards((state) => {
      return state.map((card) => {
        if (id === card.id) {
          cardSelect = card;
        }
        return {
          ...card,
          checked: id === card.id,
          actions: id === card.id ? ["edit"] : ["delete", "edit"],
        };
      });
    });
    dispatch(setInvoice(cardSelect));
  };

  useEffect(() => {
    dispatch(getInvoicesService());
    dispatch(getTaxRegimeService());
    return () => {
      dispatch(setErrorPayments(paymentStore.errors[typesRequestErrors.deleteInvoice],false,null))
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [nextAction, setNextAction] = useState(null);

  useEffect(() => {
    if (nextAction && paymentStore.invoices !== null) {
      handleAction();
    }
  }, [nextAction]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAction = () => {
    const { type, id } = nextAction;
    switch (type) {
      case "delete":
        sendInfoTM(window,actionsRfcPaymentTag,'borrar');
        setIsModalInvoice(true);
        break;
      case "edit":
        sendInfoTM(window,modalWithoutInvoiceBtnPaymentTag,'editar')
        const invoice = paymentStore.invoices.filter(
          (invoice) => invoice.id === id
        )[0];
        dispatch(setEditForm(invoice));
        addForm(); 
        break;
      default:
        break;
    }
  };

  const deleteModal = () => {
    const { id } = nextAction;

    const invoice = paymentStore.invoices.filter(
      (invoice) => invoice.id === id
    )[0];
    dispatch(deleteInvoicesService(invoice.id));
  };

  useEffect(() => {
    if (
      paymentStore.errors &&
      paymentStore.errors[typesRequestErrors.getInvoices].isError
    ) {
      setIsErrorGetInvoices({
        isError: true,
        msg: texts?.payment.errors.getInvoice
      });
    }
    if (
      paymentStore.errors &&
      paymentStore.errors[typesRequestErrors.deleteInvoice].isError
    ) {
      notiObs.next({
        type: typesNoti.error,
        text: paymentStore.errors[typesRequestErrors.deleteInvoice].msg,
      })
    }
  }, [paymentStore.errors]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(isNextLink){
      if(listCards.length > 0 && listCards.length === 3){
        notiObs.next({
          type: typesNoti.error,
          text: texts?.payment.errors.maxInvoices
        })
      } else {
        handleStateCardResume(stepsCardResume.third)
        addForm()
      }
      setIsNextLink(false)
    } 
  }, [isNextLink]) // eslint-disable-line react-hooks/exhaustive-deps

  const renderSuccessInvoice = () => {
    return (
      <div>
         <p className="listtaxtitle">{texts?.payment.listTaxTitle}</p>
         <div className="listtaxcards">
          {listCards.length !== 0
            ? listCards.map((card, index) => {
                return (
                  <div className="listtaxcard" key={index + "divinvoice"}>
                    <CardInvoice
                      key={index + "cardinvoice"}
                      data={{
                        ...card,
                        test: testPaymenTitle.cardInvoice + index
                      }}
                      onCheck={() => {
                        sendInfoTM(window,actionsRfcPaymentTag,'select')
                        handleCheck(card.id);
                      }}
                      onActions={(e) => {
                        setNextAction(e.detail);
                      }} 
                    />
                  </div>
                );
              })
            : ""}
        </div>
        <div className="listtaxlink">
          <Link
            data={{
              ...listTaxLink,
              title: texts?.payment.addInvoice
            }}
            onClick={() => setIsNextLink(true)}
          />
        </div>
      </div>
    );
  };

  const renderErrorInvoice = () => {
    return (
      <div className="feedbackalert">
         <Feedback 
            data={feedbackAlertError}
            text={isErrorGetInvoices.msg}
          />
      </div>
    );
  };
  
  return (
    <>
    <div className="listtax">
    {isErrorGetInvoices.isError ? renderErrorInvoice() : renderSuccessInvoice()}
        <div className="listtaxactions">
          <div className="listtaxaction">
            <Button
              data={{
                ...backBtn,
                title: texts?.payment.btns.back,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                sendInfoTM(window,stageTwoBtnBackPaymentTag)
                dispatch(setInvoice(null));
                handleStateCardResume(stepsCardResume.second)
                history.push("/payment/concept");
              }}
            />
          </div>
        </div>
      </div>
      <ModalInvoiceDelete
        isShow={isModalInvoice}
        onClose={() => setIsModalInvoice((state) => !state)}
        saveModal={() => deleteModal()}
        outside={() => setIsModalInvoice(false)}
      />
    </>
  );
};

export default ListTax;
