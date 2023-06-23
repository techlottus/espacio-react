import React, { useEffect } from "react";

export const Stepper = React.memo(({ data, onClick }) => {
  const stepperRef = React.createRef();

  useEffect(() => {
    stepperRef.current.data = {
      focus: data.focus || 0,
      titles: data.titles || [],
      off: data.off || false,
      initCount: data.initCount || null
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    stepperRef.current.addEventListener("onClick", onClick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-stepper ref={stepperRef}></lottus-stepper>
    </>
  );
});
