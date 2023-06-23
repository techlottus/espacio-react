import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import {
  btnHelpCenterConfirmBack,
  btnHelpCenterConfirmNext,
} from "../../../../constants/HelpCenter.constant";
import { getImageOfAssets, getImageOfAssetsMark } from "../../../../helpers/getImages";
import "./ConfirmHelpCenter.scss";
import { texts } from "../../../../texts/indexText";

const ConfirmHelpCenter = ({ noTicket, btnTitle, onNext, onBack, isError }) => {
  const [desktop, setDesktop] = useState(window.innerWidth > 991);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const background = {
    backgroundImage: `url(${getImageOfAssets(
      texts?.helpCenter.images.helpCenterFlowBanner
    )})`,
    backgroundSize: "100%",
  };

  return (
    <>
      <div style={desktop ? background : null}>
        <div className="confirmhelpcentercontainer">
          <div className="confirmhelpcentercontent">
            <div className="spikewrapper">
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
              <span className="spike"></span>
            </div>
            <div className="confirmhelpcenterwrapper">
              <div className="confirmhelpcentericon">
                {isError ? 
                 <img className="material-icons icon iconcheck" alt="img-confirm"
                 src={getImageOfAssetsMark(texts?.helpCenter.modalConfirmHelpCenter.error.img)}
                 />
                :
                <span className="material-icons icon iconcheck">
                {texts?.helpCenter.modalConfirmHelpCenter.success.icon}
              </span>
                }
              </div>
              <div className="confirmhelpcentertitle">
                <h2>
                  {isError ? texts?.helpCenter.modalConfirmHelpCenter.error.title :
                   texts?.helpCenter.modalConfirmHelpCenter.success.title}
                </h2>
              </div>
              {isError ? "" :
              <div className="confirmhelpcenterdescription">
                <p>
                   {texts?.helpCenter.modalConfirmHelpCenter.success.firstDescription} 
                  <span className="confirmticket">No: {noTicket}.</span>
                  </p>
                  <br/>
                  <p>
                   {texts?.helpCenter.modalConfirmHelpCenter.success.secondDescription} 
                </p>
              </div>
               }
              <div className="confirmhelpcenterbtns">
                <div className="confirmnextbtn">
                <Button data={btnHelpCenterConfirmNext} onClick={onNext} />
                </div>
                <Button
                  data={{
                    ...btnHelpCenterConfirmBack,
                    title: btnTitle,
                  }}
                  onClick={onBack}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmHelpCenter;
