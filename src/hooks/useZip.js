import { useState } from "react"
import  { cp } from '../assets/data/info';


export const useZip = (initialState = {}) => {

  const [zip,setZip] = useState(initialState);

  const handleZip = (zipNew) => {
    setZip({
      ...cp[zipNew]
    })
  }

  return [zip,handleZip];

}