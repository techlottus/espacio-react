import React, { useEffect } from 'react'


export const Link = ({data, onClick})  => {
    const linkRef = React.createRef();

    useEffect(() => {
        linkRef.current.data = {
            text: data.text || '',
            size: data.size || '',
            isBold: data.isBold || false,
            disabled: data.disabled || false,
            id: data.id || '',
            icon: data.icon || '',

        }
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        linkRef.current.addEventListener('onClick', onClick);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
        <lottus-link ref={linkRef}></lottus-link>
        </>
    )
}