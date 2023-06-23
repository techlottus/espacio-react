import React, { useEffect } from 'react';



export const CardItemIcon = ({data}) => {

    const cardRef = React.createRef();
  
    useEffect(() => {
      cardRef.current.data = {
        icon: data.icon || '',
        title: data.title || '',
        isHorizontal: data.isHorizontal,
        disabled: data.disabled,
      };
    })
  
    return (
      <>
        <lottus-card-item-icon ref={cardRef}></lottus-card-item-icon>
      </>
    )
  }