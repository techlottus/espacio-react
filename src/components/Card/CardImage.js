import React, { useEffect } from "react";

export const CardImage = React.memo(({ data, onClick }) => {
  const cardImageRef = React.createRef();

  useEffect(() => {
    cardImageRef.current.data = {
      disabled: data.disabled,
      hover: data.hover,
      img: data.img || "",
      title: data.title || "",
      text: data.text || "",
      id: data.id || "",
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cardImageRef.current.addEventListener("onClick", onClick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-image ref={cardImageRef}></lottus-card-image>
    </>
  );
});
