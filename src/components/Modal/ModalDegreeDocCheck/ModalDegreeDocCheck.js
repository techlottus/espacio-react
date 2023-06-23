import React, { useEffect, useRef, useState } from "react";
import { btnModalDegreeDocCheck } from "../../../constants/ProceduresDegree.constant";
import { Button } from "../../Button/Button";
import "./ModalDegreeDocCheck.scss";

export const ModalDegreeDocCheck = ({
  isShow,
  onClose,
  titleCheck,
  html=() => {return},
  outside,
  accept
}) => {

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
      <div className="modal-degree-check">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="modaltitle">
                {titleCheck}
                </div>
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
            {html()}
          </div>
          <div className="modalbtn">
              <Button
                data={{
                  ...btnModalDegreeDocCheck,
                  isExpand: window.innerWidth < 991,
                }}
                onClick={() => {
                  accept();
                }}
              />
            </div>
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};