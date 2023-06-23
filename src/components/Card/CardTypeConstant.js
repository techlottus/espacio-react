import React, { useEffect } from 'react';



export const CardTypeConstant = React.memo(({data}) => {

    const cardTypeConstantRef = React.createRef();
  
    useEffect(() => {
      cardTypeConstantRef.current.data = {
        title: data.title || '',
        text: data.text || '',
        image: data.image || '',
      };
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
      <>
        <lottus-card-type-constant ref={cardTypeConstantRef}>
        </lottus-card-type-constant>
      </>
    )
  })