import React, { useEffect } from "react";
import "./Splash.scss";
import { useSelector } from "react-redux";
import { getImageOfAssetsMark } from "../../helpers/getImages";

const Splash = () => {
  const splashStore = useSelector((state) => state.splash);
  const { texts } = useSelector(state => state.texts);

  useEffect(() => {
    if (splashStore.isShow) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [splashStore.isShow]);

  return (
    <div
      className="splash-container"
      style={{ visibility: splashStore.isShow ? "visible" : "hidden" }}
    >
      <div className="splash-content">
        <img
          src={getImageOfAssetsMark(texts?.login?.images?.splashImg)}
          className="splashimg"
          alt="logo-splash"
        />
        <span className="splashtext">{texts?.login?.splashText}</span>
      </div>
    </div>
  );
};

export default Splash;
