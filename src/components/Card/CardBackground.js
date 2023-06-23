import React, { useEffect } from 'react';



export const CardBackground = ({data}) => {

    const cardRef = React.createRef();
  
    useEffect(() => {
      cardRef.current.data = {
        title: data.title || '',
        subtitle: data.subtitle || '',
        disabled: data.disabled,
        image: data.image || '',
      };
    })
  
    return (
      <>
        <lottus-card-background ref={cardRef}></lottus-card-background>
      </>
    )
  }