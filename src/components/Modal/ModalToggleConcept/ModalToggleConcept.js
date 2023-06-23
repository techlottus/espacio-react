import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Button/Button";
import {
  btnModalToggleAccept,
  btnModalToggleCancel,
} from "../../../constants/Payment.constant";
import "./ModalToggleConcept.scss";
import { useSelector } from "react-redux";
import { testPaymenTitle } from "../../../constants/test/testPayment";

export const ModalToggle = ({ isShow, onCancel, onNext, outside }) => {
  const { texts } = useSelector(state => state.texts);
  const [isModal, setIsModal] = useState(false);

  const modalRef = useRef();

  useEffect(() => {
    setIsModal(isShow);
  }, [isShow]);

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
      <div className="modal-toggle">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <span className="material-icons icon iconright">{texts?.payment.modals.modalIcon}</span>
            <div className="title">
              {texts?.payment.modals.modalToggleConcept.title}
            </div>
          </div>
          <div className="modalbody">
            <div className="modalbtns">
              <div className="btnsecundary">
                <Button
                  data={{
                    ...btnModalToggleCancel,
                    title: texts?.payment.btnModal.cancel,
                    isExpand: window.innerWidth < 991,
                    test: testPaymenTitle.btnModalToogleCancel
                  }}
                  onClick={() => {
                    onCancel();
                  }}
                />
              </div>
              <div className="btnprimary">
                <Button
                  data={{
                    ...btnModalToggleAccept,
                    title: texts?.payment.btnModal.accept,
                    isExpand: window.innerWidth < 991,
                    test: testPaymenTitle.btnModalToogleAccept
                  }}
                  onClick={() => {
                    onNext();
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
