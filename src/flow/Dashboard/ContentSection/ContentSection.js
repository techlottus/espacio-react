import React, { useEffect, useState } from "react";
import { dataCarousel } from "../../../constants/Dashboard.constant";
import CardsDashes from "../CardDashes/CardsDashes";
import { Carousel } from "../../../components/Carousel/Carousel";
import './ContentSection.scss'
import { useSelector } from "react-redux";
import { useContainerHeigh } from "../../../hooks/contentHeight";

const ContentSection = () => {
  
  const {height} = useContainerHeigh(0)

  const { texts } = useSelector(state => state.texts);
  const [carousel, setCarousel] = useState({
    ...dataCarousel,
    size: window.innerWidth < 991 ? 'small': 'medium'
  });

  const dashboardStore = useSelector(state => state.dashboard)

  const [slide, setSlide] = useState(null)

  useEffect(() => {
    if(dashboardStore.data && dashboardStore.data.news && dashboardStore.data.news.length > 0) {
      const slides = dashboardStore.data.news.map((slide) => {
        const {title,subtitle,image,link} = slide;
        const imageSelect = (image.includes('http://') || image.includes('https://') ) ? image: "";
        return {
          title: title,
          subtitle: subtitle,
          image: imageSelect,
          link
        }
      })
      setCarousel(state => {
        return {
          ...state,
          slides
        }
      })
    }
  },[dashboardStore])

  useEffect(()=> {
    if(typeof slide === "number" ){
      const item = carousel.slides[slide]
      window.open(item.link)
      setSlide(null)
    }
  },[slide])

  return (
    <div className='content-container' style = {{minHeight: `calc(${height}px - 77px)`}}>
        <div className="contentcarousel">
            <h2 className="carouselnews">{texts?.dashboard.sectionDashboard.titleNews}</h2>
            <div className="carousel">
              <Carousel data={carousel}
              onSlide={(e) => {
                setSlide(e.detail)        
              }} />
            </div>
        </div>
        <div className="contentcards">
            <h2 className="cardstitle">{texts?.dashboard.sectionDashboard.titleCards}</h2>
            <CardsDashes/>
        </div>

    </div>
  )
};

export default ContentSection;
