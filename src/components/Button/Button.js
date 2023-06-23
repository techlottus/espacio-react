

import React, { useEffect } from 'react'


export const Button = React.memo(({ data, onClick }) => {



  const buttonRef = React.createRef();
  
  useEffect(() => {
    buttonRef.current.data = {
      id: data.id || null,
      type: data.type  || 'primary',
      title: data.title || '',
      size: data.size || 'small',
      icon: data.icon || '',
      lyIcon: data.lyIcon,
      disabled: data.disabled,
      isExpand: data.isExpand,
      test: data.test || ''
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    buttonRef.current.addEventListener('onClick', onClick);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-button ref={buttonRef}></lottus-button>
    </>
  )
})


