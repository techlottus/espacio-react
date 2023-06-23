import React, { useEffect } from 'react';



export const CardPayment = React.memo(({data,onCheck}) => {

    const cardPaymentRef = React.createRef();
  
    useEffect(() => {
      cardPaymentRef.current.data = {
        id: data.id || '',
        title: data.title || '',
        icon: data.icon || '',
        label: data.label || '',
        description: data.description || '',
        checked: data.checked,
        test: data.test || ''
      };
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      cardPaymentRef.current.addEventListener('onCheck',onCheck);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
      <>
        <lottus-card-payment ref={cardPaymentRef}>
        </lottus-card-payment>
      </>
    )
  })