import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./BenefitsGeneral.scss";
import { useDispatch, useSelector } from "react-redux";
import HeaderApp from "../../../shared/HeaderApp/HeaderApp";
import FooterApp from "../../../shared/FooterApp/FooterApp";
import BannerBenifts from "../components/BannerBenefits/BannerBenefits";
import BenefitsCards from "../components/BenefitsCards/BenefitsCards";
import { getBenefitsService } from "../../../middlewares/benefitsMiddleware";
import { useContainerHeigh } from "../../../hooks/contentHeight";


const BenefitsGeneral = () => {
  const history = useHistory();
  const { texts } = useSelector((state) => state.texts);
  const { cards } = useSelector((state) => state.benefits);
  
  const [desktop, setDesktop] = useState(window.innerWidth > 991);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  const dispatch = useDispatch();
  const { height } = useContainerHeigh(0);

  useEffect(() => {
    if (cards === null) {
      dispatch(getBenefitsService());
    }
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps



  return (
    <>
      <HeaderApp />
      <div
        className="benefits-container"
        style={{ minHeight: `calc(${height}px - 77px)` }}
      >
        <BannerBenifts />
        <BenefitsCards typeView={false} cards={cards} />
      </div>
      <FooterApp />
    </>
  );
};

export default BenefitsGeneral;
