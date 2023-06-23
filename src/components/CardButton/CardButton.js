import React, { useEffect } from "react";

export const CardButton = React.memo(({ data, dataButton, onBtn }) => {
  const cardButtonRef = React.createRef();
  const buttonRef = React.createRef();

  useEffect(() => {
    cardButtonRef.current.data = {
      title: data.title || "",
      disabled: data.disabled || "",
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    buttonRef.current.data = {
      id: dataButton.id || null,
      type: dataButton.type || "primary",
      title: dataButton.title || "",
      size: dataButton.size || "small",
      icon: dataButton.icon || "",
      lyIcon: dataButton.lyIcon,
      disabled: dataButton.disabled,
      isExpand: dataButton.isExpand,
      test: dataButton.test || "",
    };
  }, [dataButton]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    buttonRef.current.addEventListener("onClick", onBtn);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-button ref={cardButtonRef}>
        <div btnicon="">
          <lottus-button ref={buttonRef}></lottus-button>
        </div>
      </lottus-card-button>
    </>
  );
});
