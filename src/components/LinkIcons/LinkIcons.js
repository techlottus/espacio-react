import React, { useEffect } from 'react'


export const LinkIcons = ({data, onClick})  => {
    const linkIconsRef = React.createRef();

    useEffect(() => {
        linkIconsRef.current.data = {
            text: data.text || '',
            size: data.size || '',
            isUnderline: data.underline || false,
            isBold: data.isBold || false,
            disabled: data.disabled || false,
            id: data.id || '',
            iconFirst: data.iconFirst || '',
            iconSecond: data.iconSecond || '',

        }
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        linkIconsRef.current.addEventListener('onClick', onClick);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
        <lottus-link-icons ref={linkIconsRef}></lottus-link-icons>
        </>
    )
}