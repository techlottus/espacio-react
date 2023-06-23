import React, { useEffect, useRef, useState } from "react";
import { getValuesOfAuth } from "../../../helpers/auth";
import { typesDegree } from "../../../types/typesProcedures";
import { PromoLink } from "../../PromoLink/PromoLink";
import "./ModalSelectProcedure.scss";

export const ModalSelectProcedure = ({
  isShow,
  onClose,
  titleModal,
  typeProcedures,
  outside,
  onAction,
}) => {

  const modalRef = useRef();

  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    setIsModal(isShow);
  }, [isShow]);

  const [, setDesktop] = useState(window.innerWidth > 991);
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
      <div className="modal-select-procedure">
        <div className={`modalcontent ${typeProcedures.length > 2 ? 'fouritems' : 'twoitems'}`} ref={modalRef}>
          <div className="modalheader">
            <span
              className="material-icons icon"
              onClick={() => {
                onClose();
              }}
            >
              close
            </span>
          </div>
          <div className="modaltitle">
          <div className="title">{titleModal}</div>

          </div>
          <div className={`modalbody ${typeProcedures.length > 4 ? 'fiveitems' : 'fouritems'}`}>
            {typeProcedures.map((data, i) => {
              return (
                <div className="proceduretype" key={i}>
                  <PromoLink
                    data={data}
                    onClick={() => {
                      onAction(data.id, data.text)
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return <>{isModal ? handleModal() : ""}</>;
};
