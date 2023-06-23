import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Button/Button";
import "./ModalNoSubjects.scss";
import { Feedback } from "../../Feedback/Feedback";
import { useSelector } from "react-redux";
import {
  btnModalBack,
  feedbackModal,
} from "../../../constants/RegistrationSubjects.constant";

export const ModalNoSubjects = ({
  isShow,
  onClose,
  outside,
}) => {
  const [isModal, setIsModal] = useState(false);
  const { texts } = useSelector((state) => state.texts);

  const modalRef = useRef();

  const handleFeedback = () => {
    return (
      <div className="contentfeedbacksubjects">
        {texts?.registrationSubjects?.modalFeedbackSubjects}
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
      <div className="modal-subjects">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="title">
              {texts?.registrationSubjects?.modalTitleAdd}
            </div>
          </div>
          <div className="modalbody">
            <div className="infosubjects">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
