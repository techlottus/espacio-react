import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../Button/Button";
import "./ModalRequirementsProcedure.scss";
import {
  btnModalDegreeBack,
  btnModalDegreeNext,
  dataProgressModal,
} from "../../../constants/ProceduresDegree.constant";
import { ProgressBar } from "../../ProgressBar/ProgressBar";
import parse from "html-react-parser";

export const ModalRequirementsProcedure = ({
  isShow,
  onClose,
  outside,
  info,
}) => {
  const [isModal, setIsModal] = useState(false);
  

  const modalRef = useRef();

  const [progressData, setProgressData] = useState({
    ...dataProgressModal,
    progress: "",
    description: "",
  });

  const [infoModal, setInfoModal] = useState({});

  const [focus, setFocus] = useState(0);

  useEffect(() => {
    setIsModal(isShow);
  }, [isShow]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setInfoModal(info);
  },[info]) // eslint-disable-line react-hooks/exhaustive-deps

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


  useEffect(() => {
    window.scrollTo(0, 0);
    if (focus && focus >= 1) {
      setProgressData({
        ...dataProgressModal,
        progress: (focus * 100) / (infoModal.length - 1),
        description: `${focus}/${infoModal.length - 1}`,
      });
    }
  }, [focus,infoModal]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleModal = () => {
    return (
      <div className="modal-degree">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="modaltitle">
              {infoModal[focus]?.title || ''}
            </div>
            <span
              className="material-icons icon"
              onClick={() => {
                setFocus(0);
                onClose();
              }}
            >
              close
            </span>
          </div>
          {focus > 0 ? (
            <div className="progressbar">
              <ProgressBar data={progressData} />
            </div>
          ) : (
            ""
          )}
          <div className="modaldescription">
            {parse(infoModal[focus]?.text || '')}
          </div>
          <div className="modalbtns">
            <div className="btnsecundary">
              <Button
                data={{
                  ...btnModalDegreeBack,
                  isExpand: window.innerWidth < 991,
                  title: focus === 0 ? "Cerrar" : "Anterior",
                }}
                onClick={() => {
                  setFocus((state) => {
                    if (state > 0) {
                     return state - 1;
                    } else {
                      onClose();
                      return 0;
                    }
                  })
                  
                }}
              />
            </div>
            <div className="btnprimary">
              <Button
                data={{
                  ...btnModalDegreeNext,
                  isExpand: window.innerWidth < 991,
                  title:
                    focus === infoModal.length - 1 ? "Cerrar" : "Siguiente",
                }}
                onClick={() => {
                  setFocus((state) => {
                    if (state !== infoModal.length - 1) {
                      return state + 1;
                    } else {
                      onClose();
                      return 0
                    }
                  })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
