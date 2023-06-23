import React, { useEffect } from "react";

export const ButtonCircle = React.memo(({ data, onClick }) => {
  const buttoncircleRef = React.createRef();

  useEffect(() => {
    buttoncircleRef.current.data = {
      id: data.id || "",
      size: data.size || "",
      icon: data.icon || "",
      disabled: data.disabled,
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <lottus-button-circle ref={buttoncircleRef}></lottus-button-circle>
    </>
  );
});
