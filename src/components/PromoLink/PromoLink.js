import React, { useEffect } from "react";

export const PromoLink = React.memo(({ data, value = "", onClick }) => {
  const promoLinkRef = React.createRef();

  useEffect(() => {
    promoLinkRef.current.data = {
      urlImage: data.urlImage || "",
      text: data.text || "",
      icon: data.icon || "",
      color: data.color || "",
      opacity: data.opacity || "",
      height: data.height || "",
      enable: data.enable
    };
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    promoLinkRef.current.addEventListener("onClick", onClick);
  }, []);

  return (
    <>
      <lottus-promo-link-portalverse ref={promoLinkRef}></lottus-promo-link-portalverse>
    </>
  );
});
