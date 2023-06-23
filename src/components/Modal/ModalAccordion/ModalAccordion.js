import React, { useEffect, useRef, useState } from "react";
import "./ModalAccordion.scss";
import { Accordion } from "../../Accordion/Accordion";
import { useLocation } from "react-router-dom";
import { typeflowsProcedures } from "../../../constants/Procedures.constant";
import { sendInfoTM } from "../../../tagging/services/sendInfoTagManager";
import { closeIconRequirementsEquivalenceStudiesTag } from "../../../tagging/flows/procedures/equivalenceStudiesTag";
import { certificateStudyRequiTag } from "../../../tagging/flows/procedures/certificateStudyTag";
import { useSelector } from "react-redux";
import { accordionFormat } from "../../../helpers/accordionFormat";
export const ModalAccordion = ({ isShow, onClose, outside }) => {
  const location = useLocation();
  const { texts } = useSelector(state => state.texts);
  
  const modalRef = useRef();

  const [textsAccordion, setTextsAccordion] = useState({
    title: null,
    subtitle: null,
  });

  const [contentAccordion, setContentAccordion] = useState();
  const flow = location.pathname
    .replace("/procedures-flows/", "")
    .split("/")[0];
  useEffect(() => {
    switch (flow) {
      case typeflowsProcedures.equivalenceStudy:
        setTextsAccordion({
          title: texts?.procedures?.accordions?.equivalenceStudies,
          subtitle: "",
        });
        setContentAccordion(accordionFormat(texts.procedures.modalAccordion.equivalenceStudies));
        break;
      case typeflowsProcedures.certificateStudy:
        setTextsAccordion({
          title: texts?.procedures?.accordions?.studyRecord,
          subtitle: texts?.procedures?.accordions?.studyRecordSubtitle
        });
        setContentAccordion(accordionFormat(texts.procedures.modalAccordion.certificateStudy));
        break;
      default:
        break;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [isModal, setIsModal] = useState(false);

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
      <div className="modal-accordion">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="title">{textsAccordion.title}</div>
            <span
              className="material-icons icon"
              onClick={() => {
                onClose();
                switch (flow) {
                  case typeflowsProcedures.certificateStudy:
                    sendInfoTM(window, certificateStudyRequiTag, "close_x");
                    break;
                  case typeflowsProcedures.equivalenceStudy:
                    sendInfoTM(
                      window,
                      closeIconRequirementsEquivalenceStudiesTag
                    );
                    break;
                  default:
                    break;
                }
              }}
            >
              close
            </span>
          </div>
          <div className="modalbody">
            <div className="subtitle">{textsAccordion.subtitle}</div>
            <Accordion data={contentAccordion} />
          </div>
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
