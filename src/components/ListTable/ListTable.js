import React, { useEffect } from 'react'

export const ListTable = React.memo(({data,onClick}) => {

  const listTableRef = React.createRef();
  
  useEffect(() => {
    listTableRef.current.data = {
        items: data.items || [],
    }
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    listTableRef.current.addEventListener('onClick', onClick);
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-list-table ref={listTableRef}></lottus-list-table>
    </>
  )
})
