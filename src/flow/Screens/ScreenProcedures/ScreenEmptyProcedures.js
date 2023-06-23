import React from "react";
import "./ScreenEmptyProcedures.scss";
import { texts } from "../../../texts/indexText";
import { getImageOfAssetsMark } from "../../../helpers/getImages";

const ScreenEmptyProcedures = (msg,btnTitle) => {
  return (
    <>
      <div className="empty-procedures">
        <div className="emptyimage">
          <img
            src={getImageOfAssetsMark(texts?.accountStatus?.images?.empty)}
            className="imgempty"
            alt="img-empty"
          />
        </div>
        <p className="congratsmsg">
          {texts.accountStatus.emptyMessage.congrats}
        </p>
        <p className="continuemsg">
          {texts.accountStatus.emptyMessage.continue}
        </p>
      </div>
    </>
  );
};

export default ScreenEmptyProcedures;
