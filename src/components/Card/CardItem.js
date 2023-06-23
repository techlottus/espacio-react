import React, { useEffect } from "react";

export const CardItem = ({ data, onIcon }) => {
  const cardRef = React.createRef();
  const buttonRef = React.createRef();


  useEffect(() => {
    cardRef.current.data = {
      title: data.title || "",
      icon: data.icon || "",
      actions: data.actions || [],
      disabled: data.disabled,
    };
    buttonRef.current.data = {
      ...data.actions[0].configBtn
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    buttonRef.current.addEventListener("onClick", onIcon);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <lottus-card-item ref={cardRef}>
        <lottus-button ref={buttonRef} buttons></lottus-button>
      </lottus-card-item>
    </>
  );
};