import React, { useEffect } from 'react';


export const CardDash = React.memo(({data,onClick,onBtn}) => {

    const cardRef = React.createRef();
    const buttonRef = React.createRef();
  
    useEffect(() => {
      cardRef.current.data = {
        icon: data.icon || '',
        title: data.title || '',
        disabled: data.disabled,
        width: data.width || '',
        height: data.height || '',
        test: data.test || ''
      };
      buttonRef.current.data = {
        ...data.action
      }
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      buttonRef.current.addEventListener('onClick', onBtn);
      cardRef.current.addEventListener('onClick', onClick);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
      <>
        <lottus-card-dash style={{width: '100%', height:'100%'}} ref={cardRef}>
          <lottus-button ref={buttonRef} button></lottus-button>
        </lottus-card-dash>
      </>
    )
  })