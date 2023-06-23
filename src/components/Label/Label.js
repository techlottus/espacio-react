import React, { useEffect } from 'react'

export const Label = React.memo(({data, onClick}) => {

  const labelRef = React.createRef();

  useEffect(() => {
    labelRef.current.data = {
        id: data.url || '',
        type: data.type || '',
        title: data.title || '',
        icon: data.icon || '',
        iconEvent: data.iconEvent || '',
        size: data.size || '',
        disabled: data.disabled || false,
    };
  },[data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    labelRef.current.addEventListener('onClick', onClick)
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-label ref={labelRef}></lottus-label>
    </>
  )
});

