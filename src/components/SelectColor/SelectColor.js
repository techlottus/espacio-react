import React, { useEffect } from "react";

export const SelectColor = ({ data, onClickAdd, onClickRead }) => {
  const selectColorRef = React.createRef();

  useEffect(() => {
    selectColorRef.current.data = {
      items: data.items || [],
    };
  }, [data.items]);

  useEffect(() => {
    selectColorRef.current.addEventListener("onClickAdd", onClickAdd);
    selectColorRef.current.addEventListener("onClickRead", onClickRead);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-select-color ref={selectColorRef}></lottus-select-color>
    </>
  );
};
