import React, { useEffect, useRef, useState } from "react";
import "./ModalInformation.scss";

export const ModalInformation = ({
  isShow,
  onClose,
  outside,
  title = "",
  description = "",
}) => {
  const [isModal, setIsModal] = useState(false);

  const modalRef = useRef();

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
      <div className="modal-information">
        <div className="modalcontent" ref={modalRef}>
          <div className="modalheader">
            <div className="title">{title}</div>
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
            <div className="description">{description}</div>
          </div>
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
