import React, { useEffect } from 'react'

export const ProgressBar = ({data})  => {
    const progressBarRef = React.createRef();

    useEffect(() => {
        progressBarRef.current.data = {
            title: data.title || '',
            progress: data.progress || 0,
            description: data.description || '',
            size: data.size || '',
            disabled: data.disabled || false,
        }

    })
    return(
        <>
        <lottus-progress-bar ref={progressBarRef}></lottus-progress-bar>
        </>
    )
}