import React, { useEffect } from "react";
import { LinkIcons } from "../LinkIcons/LinkIcons";
import "./CardWebsite.scss";

const CardWebsite = React.memo(
  ({ data, onClick = () => {}, isLinkText = false, links = {} }) => {
    const cardWebsiteRef = React.createRef();

    useEffect(() => {
      cardWebsiteRef.current.data = {
        id: data.id || "",
        urlImage: data.urlImage || "",
        subtitle: data.subtitle || "",
        title: data.title || "",
        text: data.text || "",
        border: data.border || true,
        small: data.small || false,
        allContent: data.allContent || false,
        height: data.height || "",
        isShowCardWebsiteContent: data.isShowCardWebsiteContent || false,
        type: data.type || "vertical",
        link: data.link || true,
        background: data.background || false,
      };
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <>
        <lottus-card-website-portalverse ref={cardWebsiteRef}>
          {isLinkText ? (
            <div className="islinktext" linkText="">
              <LinkIcons data={links}  onClick={onClick}/>
            </div>
          ) : null}
        </lottus-card-website-portalverse>
      </>
    );
  }
);

export default CardWebsite;
