import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Button/Button";
import "./ModalList.scss";
import { Feedback } from "../../Feedback/Feedback";
import { useSelector } from "react-redux";
import {
  btnModalBack,
  btnModalContinue,
  feedbackModal,
} from "../../../constants/RegistrationSubjects.constant";

export const ModalList = ({
  isShow,
  onClose,
  onNext,
  outside,
  subjects = [],
}) => {
  const [isModal, setIsModal] = useState(false);
  const { texts } = useSelector((state) => state.texts);

  const modalRef = useRef();

  const handleFeedback = () => {
    return (
      <div className="contentfeedbacktext">
        {texts?.registrationSubjects?.modalFeedbackText}
      </div>
    );
  };
  useEffect(() => {
    setIsModal(isShow);
  }, [isShow]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="modal-list">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="title">
              {texts?.registrationSubjects?.modalTitle}
            </div>
          </div>
          <div className="modalbody">
            <div className="infosubjects">
              <div className="listsubjects">
                <ul className="subjectswrapper">
                  {subjects.map((e) => {
                    return <li>{e?.name}</li>;
                  })}
                </ul>
              </div>
              <div className="feedbackcontent">
                <Feedback data={feedbackModal} html={handleFeedback} />
              </div>
              <div className="modalbtns">
                <div className="btnsecundary">
                  <Button
                    data={{
                      ...btnModalBack,
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
                      ...btnModalContinue,
                      isExpand: window.innerWidth < 991,
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
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
