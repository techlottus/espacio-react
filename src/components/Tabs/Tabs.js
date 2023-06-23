import React, {useEffect} from 'react'

export const Tabs = React.memo(({data={},onTap}) => {
  const tabsRef = React.createRef();

  useEffect(() => {
    tabsRef.current.data = {
      size: data.size || '',
      items:  data.items || [],
      focus: data.focus || ''
    };
  },[data]) // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    tabsRef.current.addEventListener('onTap', onTap);

    return () => {
      window.removeEventListener('onTap', onTap);
    }
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-tabs 
        ref={tabsRef}
      ></lottus-tabs>
    </>
  )
})
