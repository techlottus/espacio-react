import React, { useEffect, useState } from "react";
import {
  cardsItemBenefits,
} from "../../../../constants/Benefits.constant";
import { CardIconText } from "../../../../components/Card/CardIconText";
import { getImageOfAssets } from "../../../../helpers/getImages";

import "./BenefitsSingle.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

const BenefitsSingle = () => {
  const history = useHistory();
  const { detail, cards } = useSelector((state) => state.benefits);
  const [desktop, setDesktop] = useState(window.innerWidth > 991);
  const [detailInfo, setDetailInfo] = useState({});
  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("resize", updateMedia);
    if (!detail) {
      history.push("/benefits/general");
    }
    setDetailInfo({
      id: detail.id,
      img: detail.img,
      title: detail.title,
      dedscription: detail.description,
      requirements: detail.requirements,
      validityDate: detail.validityDate,
      contact: detail.contact
    });
    return () => window.removeEventListener("resize", updateMedia);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo(0, 0);
    setDetailInfo({
      id: detail.id,
      img: detail.img,
      title: detail.title,
      requirements: detail.requirements,
      description: detail.description,
      validityDate: detail.validityDate,
      contact: detail.contact
    });
  }, [detail]);

  return (
    <>
      <div className="benefits-single-container">
        <div className="benefitsinfo">
          {!desktop ? <h2 className="title">{detailInfo.title}</h2> : null}
          <div className="benefitsimage">
            <img className="couponimg" src={getImageOfAssets(detailInfo.img)} alt="info" />
          </div>
          <div className="benefitstext">
            {desktop ? <h2 className="title">{detailInfo.title}</h2> : null}
            <p className="subtitle">Requisitos</p>
            <p className="textbody">{detailInfo.requirements}</p>
            <p className="subtitle">Descripción</p>
            <p className="textbody">{detailInfo.description}</p>
            <p className="validity">{detailInfo.validityDate}</p>
          </div>
        </div>
        <div className="benefitscontact">
          <div className="cardwrapper">
            <CardIconText
              data={cardsItemBenefits}
              text={detailInfo.contact}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BenefitsSingle;
