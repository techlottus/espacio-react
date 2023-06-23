import React, { useEffect, useState } from "react";
import { bannerDesk, bannerMob } from "../../../../constants/Benefits.constant";
import { getImageOfAssets } from "../../../../helpers/getImages";
import "./BannerBenefits.scss";

const BannerBenifts = () => {
  const [desktop, setDesktop] = useState(window.innerWidth > 991);
  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const background = {
    backgroundImage: `url(${getImageOfAssets(bannerDesk)})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "400px",
  };

  const backgroundMob = {
    backgroundImage: `url(${getImageOfAssets(bannerMob)})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "199px",
  };

  return (
    <>
      <div
        className="benefits-banner-container"
        style={desktop ? background : backgroundMob}
      ></div>
    </>
  );
};

export default BannerBenifts;
