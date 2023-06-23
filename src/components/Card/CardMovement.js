import React, { useEffect } from "react";



export const CardMovement = ({ data, onBtn, onClick }) => {
  const cardRef = React.createRef();
  const buttonRef = React.createRef();

  useEffect(() => {
    cardRef.current.data = {
      date: data.date || "",
      title: data.title || "",
      color: data.color || "",
      text: data.text || "",
      price: data.price || 0,
      rows: data.rows || [],
    };
    if (data.action !== null) {
      buttonRef.current.data = {
        type: data.action.type || "primary",
        title: data.action.title || "",
        size: data.action.size || "small",
        icon: data.action.icon || "",
        lyIcon: data.action.lyIcon,
        disabled: data.action.disabled,
        isExpand: data.action.isExpand,
      };
    }
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(data.action !== null){
      buttonRef.current.addEventListener("onClick", onBtn);
    }
    cardRef.current.addEventListener("onClick", onClick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-movement ref={cardRef}>
        {data.action !== null ? (
          <div btnmovement="">
            <lottus-button ref={buttonRef}></lottus-button>
          </div>
        ) : null}
      </lottus-card-movement>
    </>
  );
};
