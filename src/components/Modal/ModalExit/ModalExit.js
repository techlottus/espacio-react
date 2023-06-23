import React, { useEffect, useState } from "react";
import { Button } from "../../Button/Button";
import {
  btnModalBackExit,
  btnModalNextExit,
} from "../../../constants/Payment.constant";
import "./ModalExit.scss";
import { useSelector } from "react-redux";
import { testPaymenTitle } from "../../../constants/test/testPayment";

export const ModalExit = ({ isShow, onClose, onNext, flow }) => {
  const { texts } = useSelector((state) => state.texts);
  const [isModal, setIsModal] = useState(false);

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

  const renderTitle = (typeFlow) => {
    switch (typeFlow) {
      case "procedures":
        return texts?.general.modals.modalExit.modalTitleProcedure;
      case "payment":
       return texts?.general.modals.modalExit.modalTitlePayment;
      default:
        return ''
    }
  };
  const handleModal = () => {
    return (
      <div className="modal-exit">
        <div className="modalcontent">
          <div className="modalheader">
            <span className="material-icons icon iconright">{texts?.general.modals.modalExit.icon}</span> 
            <div className="title">{renderTitle(flow)}</div>
          </div>
          <div className="modalbody">
            <div className="modalbtns">
              <div className="btnsecundary">
                <Button
                  data={{
                    ...btnModalBackExit,
                    title: texts?.general.modals.modalExit.cancelBtn,
                    isExpand: window.innerWidth < 991,
                    test: testPaymenTitle.btnModalExitCancel
                  }}
                  onClick={() => {
                    onClose();
                  }}
                />
              </div>
              <div className="btnprimary">
                <Button
                  data={{
                    ...btnModalNextExit,
                    title: texts?.general.modals.modalExit.exitBtn,
                    isExpand: window.innerWidth < 991,
                    test: testPaymenTitle.btnModalExitAccept
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
