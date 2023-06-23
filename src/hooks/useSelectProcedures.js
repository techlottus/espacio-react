import { useEffect, useState } from "react"


export const useSelectProcedures = (info,data) => {
  const [select,setSelect] = useState([]);

  useEffect(() => {
    if(info !== null) {
      if(data === null) {
        setSelect([...info])
      }
      else {
        setSelect(info.map((e) => {
          return {
            ...e,
            active: e.value === data
          }
        }))
      }

    }
  },[info,data]) 

  return [select,setSelect];
}