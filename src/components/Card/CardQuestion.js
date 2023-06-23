import React, { useEffect } from "react";
import {
  btnFirstQuestion,
  btnSecondQuestion,
} from "../../constants/HelpCenter.constant";
import { Button } from "../Button/Button";
import "./CardQuestion.scss";

export const CardQuestion = React.memo(({ data, handleRequest=() => {return} }) => {
  const cardRef = React.createRef();

  useEffect(() => {
    cardRef.current.data = {
      title: data.title || "",
      disabled: data.disabled, 
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-question ref={cardRef}>
        <div className="buttoncardquestion" btncardquestion="">
          <div className="btncardquestionwrapper">
            <Button
              data={btnFirstQuestion}
              onClick={(e) => {
                handleRequest(e);
              }}
            />
            <Button
              data={btnSecondQuestion}
              onClick={(e) => {
                handleRequest(e);
              }}
            />
          </div>
        </div>
      </lottus-card-question>
    </>
  );
});
