import React from "react";
import "./ScreenEmptyAccountStatus.scss";
import { texts } from "../../../texts/indexText";
import { getImageOfAssetsMark } from "../../../helpers/getImages";

const ScreenEmpty = () => {
  return (
    <>
      <div className="empty-payment">
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

export default ScreenEmpty;
