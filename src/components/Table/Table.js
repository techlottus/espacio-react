import React, { useEffect } from 'react';

export const Table = React.memo(({data}) => {

    const tableRef = React.createRef();
  
    useEffect(() => {
      tableRef.current.data = {
        rows: data.rows || [],
        position: data.position || "",
        headers: data.headers || [],
        size: data.size || "",
        hover: data.hover, 
        checkbox: data.checkbox,
        download: data.download,
      };
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps 

    return (
      <>
        <lottus-table ref={tableRef}>
        </lottus-table>
      </>
    )
  });