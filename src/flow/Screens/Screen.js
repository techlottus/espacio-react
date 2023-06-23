import React from "react";
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import FooterApp from "../../shared/FooterApp/FooterApp";
import ScreenRoutes from "../../routes/ScreenRoutes";
import "./Screen.scss";
import { useContainerHeigh } from "../../hooks/contentHeight";

const Screen = () => {
  const {height} = useContainerHeigh(0)

  return (
    <>
      <HeaderApp />
      <div className="screen-container" style = {{minHeight: `calc(${height}px - 77px)`}}>
        <ScreenRoutes />
      </div>
      <FooterApp />
    </>
  );
};

export default Screen;
