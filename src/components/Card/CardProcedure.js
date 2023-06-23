import React, { useEffect } from "react";


import "./CardProcedure.scss";

export const CardProcedure = ({ data, text, price, onClick }) => {

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
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cardRef.current.addEventListener('onClick', onClick);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-icon style={{ width: "100%", height: "100%" }} ref={cardRef}>
        <div content="" className="container-content">
          <div className="text">
            <p>{text}</p>
          </div>
          <div className="price">
            <p>{price}</p>
          </div>
        </div>
      </lottus-card-icon>
    </>
  );
};
