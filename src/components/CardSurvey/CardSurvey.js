import React, { useEffect } from "react";
import "./CardSurvey.scss";
import { useSelector } from "react-redux";

export const CardSurvey = React.memo(({ data, onClick }) => {
  const cardSurveyRef = React.createRef();
  const { texts } = useSelector((state) => state.texts);

  useEffect(() => {
    cardSurveyRef.current.data = {};
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cardSurveyRef.current.addEventListener("onClick", onClick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="cardsurveycontainer">
        <div className="cardtext">
          <p className="cardtitle">
            {texts?.evaluateServices?.modalSurvey?.title}
          </p>
          <span className="carddescription">
            {texts?.evaluateServices?.modalSurvey?.text}
          </span>
        </div>
        <lottus-card-survey ref={cardSurveyRef}></lottus-card-survey>
      </div>
    </>
  );
});
