import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Button/Button";
import {
  btnModalConceptCancel,
  btnModalConceptDelete,
} from "../../../constants/Payment.constant";
import "./ModalConceptDelete.scss";
import { useSelector } from "react-redux";

export const ModalConceptDelete = ({ isShow, onClose, handleDelete, outside }) => {

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
      <div className="modal-concepts">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
          <span className="material-icons icon iconright">{texts?.payment.modals.modalIcon}</span>
            <div className="title">
              {texts?.payment.modals.modalConceptDelete.title}
            </div>
          </div>
          <div className="modalbody">
            <div className="modalbtns">
              <div className="btnsecundary">
                <Button
                  data={{
                    ...btnModalConceptCancel,
                    title: texts?.payment.btnModal.cancel,
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
                    ...btnModalConceptDelete,
                    title: texts?.payment.btnModal.delete,
                    isExpand: window.innerWidth < 991,
                  }}
                  onClick={() => {
                    handleDelete();
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
