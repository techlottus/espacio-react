import React, { useEffect } from "react";

export const CardResume = React.memo(({ data }) => {
  const cardResumeRef = React.createRef();

  useEffect(() => {
    cardResumeRef.current.data = {
      label: data.label || "",
      title: data.title || "",
      subtitle: data.subtitle || "",
      isTotal: data.isTotal,
      totalTitle: "Total",
      totalUnit: data.totalUnit || "",
      price: data.price || "",
      texts: data.texts || [],
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-resume ref={cardResumeRef}></lottus-card-resume>
    </>
  );
});
