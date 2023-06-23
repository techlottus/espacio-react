import React, { useEffect } from "react";

export const CardSatisfaction = React.memo(({ data, onClick }) => {
  const cardSatisfactionRef = React.createRef();

  useEffect(() => {
    cardSatisfactionRef.current.data = {
      title: data.title || "",
      items: data.items || [],
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cardSatisfactionRef.current.addEventListener("onClick", onClick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-satisfaction ref={cardSatisfactionRef}></lottus-card-satisfaction>
    </>
  );
});
