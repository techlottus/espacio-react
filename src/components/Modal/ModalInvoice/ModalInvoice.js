import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Button/Button";
import {
  btnModalBackInvoice,
  btnModalNextInvoice,
  optionsStates,
} from "../../../constants/Payment.constant";
import "./ModalInvoice.scss";
import { formatString } from "../../../helpers/formatString";
import { useSelector } from "react-redux";

export const ModalInvoice = ({ isShow, onClose, saveModal, values, outside }) => {
  const { texts } = useSelector(state => state.texts);
  const [isModal, setIsModal] = useState(false);
  const [stateText, setStateText] = useState(null)

  const modalRef = useRef();

  useEffect(() => {
    setIsModal(isShow);
    if (isShow) {
      setStateText(optionsStates.filter((state) => values.state === state.value)[0].text) 
    }
  }, [isShow, values]);

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

  const handleModal = () => {
    return (
      <div className="modal-invoice">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
          <span className="material-icons icon iconright">{texts?.payment.modals.modalIcon}</span>
            <div className="title">{texts?.payment.modals.modalInvoice.title}</div>
          </div>
          <div className="modalbody">
            <p> {values.rfc ? `${texts?.payment.cardInvoice.rfc} ${values.rfc.toUpperCase()}` : ""}</p>
            <p>
              {values.businessName
                ? `${texts?.payment.cardInvoice.businessName} ${values.businessName}`
                : ""}
            </p>
            <p>
              {values.fullName ? `${texts?.payment.cardInvoice.name} ${values.fullName}` : ""}
            </p>
            <p>
              {values.zipCode
                ? `${texts?.payment.cardInvoice.address} ${values.street}, ${values.neighborhood}, ${values.city}, ${formatString(stateText)}, ${values.zipCode}`
                : ""}
            </p>
            <p> {values.email ? `${texts?.payment.cardInvoice.email} ${values.email}` : ""}</p>
            <p> {values.cfdiUsage ? `${texts?.payment.cardInvoice.cfdi} ${values.cfdiUsage}` : ""}</p>
            <p> {values.regime ? `${texts?.payment.cardInvoice.regime} ${values.regime}` : ""}</p>
            <div className="modalbtns">
              <div className="btnsecundary">
                <Button
                  data={{
                    ...btnModalBackInvoice, 
                    title: texts?.payment.btnModal.back,
                    isExpand: window.innerWidth < 991,
                  }}
                  onClick={() => {
                    onClose();
                  }}
                />
              </div>
              <div className="btnprimary">
                <Button
                  data={{
                    ...btnModalNextInvoice,
                    title: texts?.payment.btnModal.next,
                    isExpand: window.innerWidth < 991,
                  }}
                  onClick={() => {
                    saveModal();
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
