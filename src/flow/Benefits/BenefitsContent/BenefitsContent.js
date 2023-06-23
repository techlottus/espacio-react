import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContainerHeigh } from "../../../hooks/contentHeight";
import FooterApp from "../../../shared/FooterApp/FooterApp";
import HeaderApp from "../../../shared/HeaderApp/HeaderApp";
import BenefitsCards from "../components/BenefitsCards/BenefitsCards";
import BenefitsSingle from "../components/BenefitsSingle/BenefitsSingle";
import "./BenefitsContent.scss";

const BenefitsContent = () => {
  const dispatch = useDispatch();

  const [desktop, setDesktop] = useState(window.innerWidth > 991);
  const [infoSingle, setInfoSingle] = useState();
  const [listCards, setListCards] = useState();

  const { cards } = useSelector((state) => state.benefits);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };
  const { height } = useContainerHeigh(0);

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <HeaderApp />
      <div
        className="benefits-content-container"
        style={{ minHeight: `calc(${height}px - 77px)` }}
      >
        <BenefitsSingle />
        <BenefitsCards typeView={true} cards={cards}/>
      </div>
      <FooterApp />
    </>
  );
};

export default BenefitsContent;
