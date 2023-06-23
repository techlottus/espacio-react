import React, { useEffect } from "react";

export const Paginator = ({ data = {} }) => {
  const paginatorRef = React.createRef();

  useEffect(() => {
    paginatorRef.current.data = {
      iconPrevious: data.iconPrevious || "",
      iconNext: data.iconNext || "",
      size: data.size || "",
      id: data.id || "",
      maxNumbers: data.maxNumbers || 0,
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-paginator ref={paginatorRef}></lottus-paginator>
    </>
  );
};
