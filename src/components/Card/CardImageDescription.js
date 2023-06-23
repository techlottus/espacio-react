import React, { useEffect } from "react";

export const CardImageDescription = React.memo(({ data, onClick, html=()=>{} }) => {
  const cardImageDescriptionRef = React.createRef();

  useEffect(() => {
    cardImageDescriptionRef.current.data = {
      title: data.title || "",
      text: data.text || "",
      id: data.id || "",
      urlImage: data.urlImage || "",
      subtitle: data.subtitle || "",
      border: data.border,
      allContent: data.allContent,
      height: data.height || "",
      isShowCardWebsiteContent: data.isShowCardWebsiteContent,
      background: data.background,
      type: data.type || "",
      link: data.link,
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cardImageDescriptionRef.current.addEventListener("onClick", onClick);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-card-website-portalverse ref={cardImageDescriptionRef}>
        <div cardWebsiteContent="">
            {html()}
        </div>
      </lottus-card-website-portalverse>
    </>
  );
});
