import React, { useState } from "react";
import "./RegistrationSubjectsStickResume.scss";
import RegistrationSubjectsResumeDesk from "./RegistrationSubjectsResumeDesk";

const RegistrationSubjectsStickResume = ({ addSubjects, onNext, onRemove }) => {
  const [isShow, setIsShow] = useState(false);

  const calcHeight = () => {
    return !isShow
      ? //  true !== null
        // ? stateCardResume === stepsCardResume.second ? '300px': (paymentStore?.searchAmount?.amountAdd ? '300px': '250px')
        "120px"
      : "380px";
  };

  return (
    <>
      <div
        className="stickresume-container"
        style={{
          height: calcHeight(),
        }}
      >
        <span
          className="material-icons icon"
          onClick={() => {
            setIsShow((state) => !state);
          }}
        >
          {isShow ? "keyboard_arrow_down" : "expand_less"}
        </span>
        <RegistrationSubjectsResumeDesk
          addSubjects={addSubjects}
          onRemove={onRemove}
          onNext={() => {
            onNext();
            setIsShow(false);
          }}
          isMobile={true}
          isShow={isShow}
        />
      </div>
    </>
  );
};

export default RegistrationSubjectsStickResume;
