import React, { useEffect, useRef, useState } from "react";
import env from "../../../enviroment/environment";
import { getValuesOfAuth } from "../../../helpers/auth";
import { typesModalityBanner } from "../../../types/typesProcedures";
import "./ModalImage.scss";

export const ModalImage = ({ isShow, onClose, outside }) => {
  const modalRef = useRef();

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
      <div className="modal-image">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="modaltitle">Convocatoria de Becas</div>
            <span
              className="material-icons icon"
              onClick={() => {
                onClose();
              }}
            >
              close
            </span>
          </div>

          <div className="modalbody">
            <img
              src={getValuesOfAuth().urlsBecas?.urlConvocatoria}
              className="imgscholarship"
              alt="img-scholarship" 
            />
          </div>
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};