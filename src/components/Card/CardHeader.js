import React from "react";
import "./CardHeader.scss";
import { getValuesOfAuth } from "../../helpers/auth";
import accents from "remove-accents";
import { useSelector } from "react-redux";
import { getImageOfAssets } from "../../helpers/getImages";

const CardHeader = ({ info }) => {
  const { texts } = useSelector(state => state.texts);
  const quote =
    info.data &&
    info.data.quote &&
    info.data.quote.quote ;

  const { name, mask } = getValuesOfAuth();
  const alias = name && name.length > 0 ? ", " + name.split(" ")[0] : "";

  return (
    <div className="cardheadercontainer">
      <div className="cardheadercontent">
        <h2 className="cardheadergreeting">
          {texts?.dashboard.titleWelcome}
          {accents.remove(alias)}
        </h2>
        <span className="cardheaderenroll">{mask}</span>
        <span className="cardheaderquote">{quote}</span>
      </div>
      <img
        src={getImageOfAssets(texts?.dashboard?.images?.cardHeader)}
        alt="logo"
        className="cardheaderpicture"
      />
    </div>
  );
};

export default CardHeader;
