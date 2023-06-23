import React, { useState, useEffect, useContext } from "react";
import {
  tabsTax,
  backBtn,
  saveBtn,
  typesPerson,
  stepsCardResume,
} from "../../../../../constants/Payment.constant";
import { texts } from "../../../../../texts/indexText";
import { Tabs } from "../../../../../components/Tabs/Tabs";
import { Button } from "../../../../../components/Button/Button";
import "./FormsTax.scss";
import Physical from "../../../Forms/Physical/Physical";
import Moral from "../../../Forms/Moral/Moral";
import { useDispatch } from "react-redux";
import {
  postInvoiceService,
  putInvoiceService,
} from "../../../../../middlewares/paymentMiddleware";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setEditForm, setErrorPayments, setInvoice } from "../../../../../actions/paymentAction";
import { typesRequestErrors } from "../../../../../constants/error.constant";
import { ModalInvoice } from "../../../../../components/Modal/ModalInvoice/ModalInvoice";
import { notiObs } from "../../../../../observables/notificationObs";
import { typesNoti } from "../../../../../types/typeNoti";
import { sendInfoTM } from "../../../../../tagging/services/sendInfoTagManager";
import { actionsRfcPaymentTag, stageTwoRfcBtnBackPaymentTag, stageTwoTabFisPaymentTag, stageTwoTabMorPaymentTag } from "../../../../../tagging/flows/paymentTag";
import { PaymentContext } from "../../../PaymentContext";

const FormsTax = ({ cancelForm, saveForm }) => {
  const paymentStore = useSelector((state) => state.payment);
  const { handleStateCardResume } = useContext(PaymentContext); 

  const history = useHistory();

  const dispatch = useDispatch();
  const [tabs, setTabs] = useState({ 
    ...tabsTax,
    items: [
      {
        ...tabsTax.items[0],
        title: texts?.payment.invoiceType.one,
      },
      {
        ...tabsTax.items[1],
        title: texts?.payment.invoiceType.two,
      },
    ],
  });
  const [typeTab, setTypeTab] = useState(typesPerson.fisica);
  const [formVals, setFormVals] = useState({});
  const [save, setSave] = useState({
    ...saveBtn,
    title: texts?.payment.btns.save,
    disabled: true,
  });

  const [next, setNext] = useState(false);
  const [back, setBack] = useState(false);
  const [isModalInvoice, setIsModalInvoice] = useState(false);

  const onSave = (values) => {
    if (values !== null) {
      setFormVals(values);
      setSave({
        ...save,
        disabled: false,
      });
    } else {
      setSave({
        ...save,
        disabled: true,
      });
    }
  };

  useEffect(() => {
    if (paymentStore.editForm !== null && paymentStore.editForm.personType) {
      const focus = paymentStore.editForm.personType.toString();
      setTabs((state) => {
        return {
          ...state,
          focus,
          items: state.items.map((item) => {
            return {
              ...item,
              disabled: item.id !== focus,
            };
          }),
        };
      });
      setTypeTab(focus);
    }

    return () => {
      dispatch(setEditForm(null));
      dispatch(setInvoice(null));
      dispatch(setErrorPayments(typesRequestErrors.putInvoices, false, null))
      dispatch(setErrorPayments(typesRequestErrors.postInvoices, false, null))
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!save.disabled) {
      paymentStore.editForm !== null
        ? dispatch(putInvoiceService(formVals, paymentStore.editForm.id, saveForm))
        : dispatch(postInvoiceService(formVals, saveForm));
    }
  }, [next]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (back) {
      if (back && paymentStore.invoices && paymentStore.invoices.length === 0) {
        handleStateCardResume(stepsCardResume.second);
        history.push("/payment/concept");
      } else {
        handleStateCardResume(stepsCardResume.fourth)
        cancelForm();
      }
    }
  }, [back]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderForm = (type) => {
    switch (type) {
      case typesPerson.fisica:
        return <Physical onSave={onSave} />;
      case typesPerson.moral:
        return <Moral onSave={onSave} />;
      default:
        return;
    }
  };

  const handleTap = (e) => {
    typesPerson.fisica === e.detail ? sendInfoTM(window,stageTwoTabFisPaymentTag):sendInfoTM(window,stageTwoTabMorPaymentTag)
    setTypeTab(e.detail);
  };

  useEffect(() => {
    if(paymentStore.errors && paymentStore.errors[typesRequestErrors.postInvoices].isError){
      notiObs.next({
        type: typesNoti.error,
        text: paymentStore.errors[typesRequestErrors.postInvoices].msg
      })
    } 
    if (paymentStore.errors &&   paymentStore.errors[typesRequestErrors.putInvoices].isError){
      notiObs.next({
        type: typesNoti.error,
        text: paymentStore.errors[typesRequestErrors.putInvoices].msg
      })
    }
  }, [paymentStore.errors])

  return (
    <>
      <div className="formstax">
        <p className="titletax">{texts?.payment.formTaxTitle}</p>
        <div className="tabstax">
          <Tabs data={tabs} onTap={handleTap} />
        </div>
        <div className="formtax">{renderForm(typeTab)}</div>
        <div className="actionstax">
          <div className="actiontax">
            <Button
              data={{
                ...backBtn,
                title: texts?.payment.btns.back
              }}
              onClick={() => {
                sendInfoTM(window,stageTwoRfcBtnBackPaymentTag)
                setBack((state) => !state);
              }}
            />
          </div>
          <div className="actiontax">
            <Button
              data={save}
              onClick={() => {
                sendInfoTM(window,actionsRfcPaymentTag,'add');
                setIsModalInvoice((state) => !state);
              }}
            />
          </div>
        </div>
      </div>
      <ModalInvoice isShow={isModalInvoice}  
      outside={() => setIsModalInvoice(false)}
      onClose={() => setIsModalInvoice((state) => !state)} 
      saveModal={() => setNext((state) => !state)} 
      values={formVals}/>
    </>
  );
};

export default FormsTax;
