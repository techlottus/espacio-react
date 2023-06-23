import React, { useEffect, useRef, useState } from "react";
import "./ModalSolicitude.scss";
import { Feedback } from "../../Feedback/Feedback";
import {
  btnSolicitude,
  btnSolicitudeError,
  feedbackPaySolicitude,
  feedbackPaySolicitudeError,
} from "../../../constants/Procedures.constant";
import { Button } from "../../Button/Button";
import { useSelector } from "react-redux";

export const ModalSolicitude = ({
  isShow,
  onClose,
  onNext,
  noTicket,
  isError,
  isShowButton,
  outside
}) => {
  const { ticket } = noTicket;
  const [isModal, setIsModal] = useState(false);
  const { texts } = useSelector((state) => state.texts);

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

  const solicitudeContent = () => {
    return (
      <div className="solicitudecontent">
        <h2 className="title"> {texts?.procedures?.modalSolicitude?.title}</h2>
        <p className="text">
          {texts?.procedures?.modalSolicitude?.textTicket1} <span className="boldtxt">{texts?.procedures?.modalSolicitude?.textTicket2} {ticket}.</span> {texts?.procedures?.modalSolicitude?.textTicket3}
        </p>
        {isShowButton ? (
          <div className="btnsolicitude">
            <p className="secondtext">
              {texts?.procedures?.modalSolicitude?.secondText}
            </p>
            <Button
              data={{
                ...btnSolicitude,
                isExpand: window.innerWidth < 991,
              }}
              onClick={() => {
                onNext();
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const solicitudeContentError = () => {
    return (
      <div className="solicitudecontent">
        <h2 className="title">
          {texts?.procedures?.modalSolicitude?.errorMsg}
        </h2>
        <p className="text">{isError.message}</p>
        <div className="btnsolicitude">
          <Button
            data={{
              ...btnSolicitudeError,
              isExpand: window.innerWidth < 991,
            }}
            onClick={() => {
              onClose();
            }}
          />
        </div>
      </div>
    );
  };

  const handleModal = () => {
    return (
      <div className="modal-solicitude">
        <div className="modalbody" ref={modalRef}>
          <Feedback
            data={
              isError.error ? feedbackPaySolicitudeError : feedbackPaySolicitude
            }
            html={isError.error ? solicitudeContentError : solicitudeContent}
            onRight={() => {
              onClose();
            }}
          />
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
