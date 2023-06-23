import React, { useEffect } from "react";

export const TableManhattan = React.memo(
  ({ data, onClickAdd, onClickRead }) => {
    const tableMRef = React.createRef();

    useEffect(() => {
      tableMRef.current.data = {
        rows: data.rows || [],
        position: data.position || "",
        headers: data.headers || [],
        size: data.size || "",
        hover: data.hover,
        checkbox: data.checkbox,
        download: data.download,
        items: data.items || [],
      };
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      tableMRef.current.addEventListener("onClickAdd", onClickAdd);
      tableMRef.current.addEventListener("onClickRead", onClickRead);
    }, []); // e

    return (
      <>
        <lottus-table-manhattan ref={tableMRef}></lottus-table-manhattan>
      </>
    );
  }
);
