import React, { useEffect } from 'react';



export const Select = React.memo(({data, options,onClick}) => {

    const selectRef = React.createRef();
  
    useEffect(() => {
      selectRef.current.data = {
        textDefault: data.textDefault || '',
        disabled: data.disabled,
        reset: data.reset,
        icon: data.icon || '',
        zindexOptions: 100,
        isLabel: data.isLabel || false
      };
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps 

    useEffect(() => {
      selectRef.current.options = options || null
    },[options]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      selectRef.current.addEventListener('onClick', onClick);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
      <>
        <lottus-select ref={selectRef}></lottus-select>
      </>
    )
})