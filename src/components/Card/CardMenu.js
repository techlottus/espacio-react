import React, { useEffect } from 'react';



export const CardMenu = ({emoji}) => {

    const cardRef = React.createRef();
  
    useEffect(() => {
      cardRef.current.emoji = emoji
    })
  
    return (
      <>
        <lottus-card-menu ref={cardRef}></lottus-card-menu>
      </>
    )
  }