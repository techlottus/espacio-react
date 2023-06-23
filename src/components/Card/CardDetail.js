import React, { useEffect } from 'react';



export const CardDeatil = ({data,onCheck,onAction}) => {

    const cardDetailRef = React.createRef();
  
    useEffect(() => {
      cardDetailRef.current.data = {
        id: data.id || '',
        title: data.title || '',
        description: data.description || '',
        price: data.price || 0,
        action: data.action || '',
        checked: data.checked,
        test: data.test || '',
        testAction: data.testAction || ''
      };
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      cardDetailRef.current.addEventListener('onCheck',onCheck);
      cardDetailRef.current.addEventListener('onAction',onAction)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
      <>
        <lottus-card-detail ref={cardDetailRef}></lottus-card-detail>
      </>
    )
  }