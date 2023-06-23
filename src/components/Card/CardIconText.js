import React, { useEffect } from "react";

export const CardIconText = React.memo(({ data, text, onClick }) => {

  const cardRef = React.createRef();

  useEffect(() => {
    cardRef.current.data = {
      icon: data.icon || "",
      title: data.title || "",
      text: data.text || "",
      price: data.price || 0,
      color: data.color || "",
      disabled: data.disabled,
      ticket: data.ticket || "",
      date: data.date || "",
      isContent: data.isContent,
      withOutShadow: data.withOutShadow,
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cardRef.current.addEventListener('onClick', onClick);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-icon ref={cardRef}>
      <div content="" className="cardicon-container">
          <div className="cardicontext">
            <p>{text}</p>
          </div>
        </div>
      </lottus-card-icon>
    </>
  );
});
