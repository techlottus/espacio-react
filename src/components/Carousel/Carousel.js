import React, { useEffect } from 'react'



export const Carousel = React.memo(({data, onSlide})  => {
    const carouselRef = React.createRef();

    useEffect(() => {
        carouselRef.current.data = {
            slides: data.slides || [],
            width: '100%',
            height: window.innerWidth < 991 ? '180px':'338px',
            size: data.size
        }
    },[data]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        carouselRef.current.addEventListener('onSlide', onSlide);
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
        <lottus-carousel ref={carouselRef}></lottus-carousel>
        </>
    )
})