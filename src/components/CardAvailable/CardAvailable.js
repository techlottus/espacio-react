import React, { useEffect } from 'react'

export const CardAvailable = React.memo(({data}) => {

  const cardAvailableRef = React.createRef();
  
  useEffect(() => {
    cardAvailableRef.current.data = {
        text: data.text || "",
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-available ref={cardAvailableRef}></lottus-card-available>
    </>
  )
})