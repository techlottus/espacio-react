import React, { useEffect } from 'react';



export const CardDate = ({data}) => {

    const cardRef = React.createRef();
  
    useEffect(() => {
      cardRef.current.data = {
        day: data.day || 0,
        dayName: data.dayName || '',
        title: data.title || '',
        items: data.item || [],
        disabled: data.disabled,
      };
    })
  
    return (
      <>
        <lottus-card-date ref={cardRef}></lottus-card-date>
      </>
    )
  }