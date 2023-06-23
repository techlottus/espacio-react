

import React, { useEffect } from 'react'

export const Footer = React.memo(({data, onLink}) => {

  const footerRef = React.createRef();

  useEffect(() => {
    footerRef.current.data = {
      urlLogo: data.urlLogo || '',
      text: data.text || '',
      privacy: data.privacy || '',
      terms: data.terms || '',
    };
    footerRef.current.addEventListener('onLink', onLink)
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-footer ref={footerRef}></lottus-footer>
    </>
  )
})

