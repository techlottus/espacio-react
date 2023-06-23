import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Button/Button";
import { constantsModalBtn } from "../../../constants/Procedures.constant";
import "./ModalConstants.scss";
import { CardTypeConstant } from "../../Card/CardTypeConstant";
import { useSelector } from "react-redux";
import { downloadFile } from "../../../helpers/download";
import { notiObs } from "../../../observables/notificationObs";
import { typesNoti } from "../../../types/typeNoti";
import env from "../../../enviroment/environment";
import { sendInfoTM } from "../../../tagging/services/sendInfoTagManager";
import {
  closeRecordTypeStudyRecordTag,
  downloadRecordTypeStudyRecordTag,
} from "../../../tagging/flows/procedures/studyRecordTag";

export const ModalConstants = ({ isShow, onClose, HandleDemo, outside }) => {
  const { modal } = useSelector((state) => state.procedureStudyRecord);
  const { texts } = useSelector((state) => state.texts);

  const modalRef = useRef();

  const [isModal, setIsModal] = useState(false); 

  useEffect(() => {
    setIsModal(isShow);
  }, [isShow]);

  const [desktop, setDesktop] = useState(window.innerWidth > 991);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
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
      <div className="modal-constants">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="title">
              {texts?.procedures?.modalConstants?.title}
            </div>
            <span
              className="material-icons icon"
              onClick={() => {
                onClose();
                sendInfoTM(
                  window,
                  closeRecordTypeStudyRecordTag,
                  "modal_t_close"
                );
              }}
            >
              close
            </span>
          </div>
          <div className="btnconstants">
            <div className="btnprimary">
              <Button
                data={{
                  ...constantsModalBtn,
                  isExpand: window.innerWidth < 991,
                }}
                onClick={() => {
                  downloadFile(
                    "tipos-constancias.pdf",
                    `${env.contentAssets}docs/constancia/utc/tipos-constancias.pdf`
                  )
                    .then(() => {
                      notiObs.next({
                        type: typesNoti.success,
                        text: texts.procedures.downloadPDFSuccess,
                      });
                      sendInfoTM(
                        window,
                        downloadRecordTypeStudyRecordTag,
                        "modal_t_demo"
                      );
                    })
                    .catch(() => {
                      notiObs.next({
                        type: typesNoti.error,
                        text: texts.procedures.downloadPDFError,
                      });
                    });
                  onClose();
                }}
              />
            </div>
          </div>
          <div className="modalbody">
            {modal.map((dataModal, i) => {
              const data = {
                title: dataModal.label,
                text: dataModal.description,
                image: desktop ? dataModal.imageUrl : null,
              };
              return <CardTypeConstant data={data} key={i} />;
            })}
          </div>
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
