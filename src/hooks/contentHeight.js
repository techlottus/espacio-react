import { useEffect, useState } from "react"

export const useContainerHeigh = initial => {
    const [height, setHeight] = useState(initial)
  
    const updateState = () => {
      const containerHeight = window.innerHeight - document.querySelector('.footer').getBoundingClientRect().height
      if(height !== containerHeight) setHeight(containerHeight)
    }
  
    useEffect(() => {
      updateState()
      window.addEventListener('resize', updateState)
      return () => window.removeEventListener('resize', updateState)
    }, [])
  
    return { height, updateState}
  }