import React, { useEffect } from 'react';



export const Toggle = React.memo(({data, onSwitch}) => {

    const toggleRef = React.createRef();
  
    useEffect(() => {
      toggleRef.current.data = {
        size: data.size ||'',
        status: data.status,
        disabled: data.disabled,
        test: data.test || '',
      };
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps 

    useEffect(() => {
      toggleRef.current.addEventListener('onSwitch', onSwitch)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
      <>
        <lottus-toogle-switch ref={toggleRef}></lottus-toogle-switch>
      </>
    )
  });