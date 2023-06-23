import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Button/Button";
import {
  btnModalAcademicContinue,
  btnModalAcademicExit,
} from "../../../constants/ProceduresAcademicHistory.constant";
import "./ModalProcedures.scss";
import { cardProfile } from "../../../constants/AccountStatus.constant";
import { Feedback } from "../../Feedback/Feedback";
import { CardProfile } from "../../Card/CardProfile";
import { feedbackProcedures } from "../../../constants/Procedures.constant";
import { useSelector } from "react-redux";
import { getImageOfAssets } from "../../../helpers/getImages";

export const ModalProcedures = ({
  isShow,
  onClose,
  onNext,
  infoModal,
  outside,
}) => {
  const [isModal, setIsModal] = useState(false);
  const { texts } = useSelector((state) => state.texts);

  const modalRef = useRef();

  const [profile, setProfile] = useState({
    ...cardProfile,
    image: getImageOfAssets(texts?.accountStatus?.images?.user),
  });

  const { profile: profileProcedure } = useSelector(
    (state) => state.procedures
  );

  useEffect(() => {
    if (infoModal.profile !== null) {
      const inforProfile = infoModal.profile;
      setProfile((state) => {
        return {
          ...state,
          name: inforProfile?.name,
          items: inforProfile?.items,
        };
      });
    }
  }, [infoModal.profile]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFeedback = () => {
    return (
      <div className="contentfeedbackprocedures">
        {infoModal.title} {texts?.procedures?.modalProcedures?.feedback}{" "}
        {infoModal.cost}
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
      <div className="modal-academic">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="title">
              {texts?.procedures?.modalProcedures?.title}
            </div>
          </div>
          <div className="modalbody">
            {profileProcedure ? (
              <div className="academicprofile">
                <CardProfile data={profile} />
              </div>
            ) : (
              ""
            )}
            <div className="infoacademic">
              {infoModal.information.map((info, i) => {
                return (
                  <p key={i} className="infoacademictext">
                    {info}
                  </p>
                );
              })}
              {infoModal?.file && Array.isArray(infoModal.file)
                ? infoModal.file.map((doc, i) => {
                    return (
                      <p key={i} className="infoacademictext">
                        <span className="material-icons outlined">
                          description
                        </span>
                        {doc}
                      </p>
                    );
                  })
                : ""}
            </div>
            {infoModal.title ? (
              <div className="feedbackcontent">
                <Feedback data={feedbackProcedures} html={handleFeedback} />
              </div>
            ) : (
              <></>
            )}

            <div className="modalbtns">
              <div className="btnsecundary">
                <Button
                  data={{
                    ...btnModalAcademicExit,
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
                    ...btnModalAcademicContinue,
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
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
