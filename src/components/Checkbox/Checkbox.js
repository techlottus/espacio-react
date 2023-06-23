import React, { useEffect } from "react";



export const Checkbox = React.memo(({ data, onCheck }) => {
  const checkboxRef = React.createRef();

  useEffect(() => {
    checkboxRef.current.data = {
      label: data.label || "",
      disabled: data.disabled,
      selected: data.selected,
      name: data.name || "",
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkboxRef.current.addEventListener("onCheck", onCheck);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-checkbox ref={checkboxRef}></lottus-checkbox>
    </>
  );
});
