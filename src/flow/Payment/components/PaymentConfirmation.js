import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import "./PaymentConfirmation.scss";
import { texts } from "../../../texts/indexText";
import {
  getImageOfAssets,
  getImageOfAssetsMark,
} from "../../../helpers/getImages";
import {
  homeConfirmBtn,
  reloadConfirmBtn,
  successConfirmBtn,
} from "../../../constants/Screen.constant";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { CardSurvey } from "../../../components/CardSurvey/CardSurvey";
import env from "../../../enviroment/environment";
import { typesMark } from "../../../types/typesMark";
import { getValuesOfAuth } from "../../../helpers/auth";

const PaymentConfirmation = () => {
  const history = useHistory();
  const location = useLocation();
  const paymentStore = useSelector((state) => state.payment);
  const [isConfirmError, setIsConfirmError] = useState(false);

  useEffect(() => {
    setIsConfirmError(location.state?.isError);
  }, [location.state]);

  const formatUrl = (url) => {
    let names = getValuesOfAuth()?.name.split(" ");
    let name = "";
    let lastName = "";
    if (names.length > 4) {
      let name_one = names.shift();
      let name_two = names.shift();
      name = name_one + " " + name_two;
    } else {
      name = names.shift();
    }

    lastName = names.join(" ");
    return `${url}&campus=${getValuesOfAuth()?.medallia?.campusId}&matricula=${
      getValuesOfAuth().mask
    }&nombre=${name}&apellidos=${lastName}&correo=${getValuesOfAuth().email}`;
  };

  const renderSuccess = () => {
    return (
      <>
        <div className="confirmimage">
          <img
            src={getImageOfAssets(texts?.screen?.images?.paymentSuccess)}
            className="imgconfirm"
            alt="img-confirm"
          />
        </div>
        <p className="confirmtitlemsg">
          {texts.screen.confirmation.titleConfirmSuccess}
        </p>
        <p className="confirmdescriptionmsg">
          {texts.screen.confirmation.descriptionConfirmSuccess}
        </p>
        <CardSurvey
          onClick={() => {
            let url = "";
            if (env.mark === typesMark.utc) {
              url =
                "https://survey3.medallia.com/?utc-inst-digitales&marca=3&seccion=13";
            } else {
              url =
                "https://survey3.medallia.com/?ula-inst-digitales&campus=ULA_01&seccion=13";
            }

            window.open(formatUrl(url));
          }}
        />
        <div className="btnwrapper">
          <div className="confirmbtn">
            <Button
              data={successConfirmBtn}
              onClick={() => {
                history.push("/");
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const renderError = () => {
    return (
      <>
        <div className="confirmimage">
          <img
            src={getImageOfAssetsMark(texts?.screen?.images?.paymentError)}
            className="imgconfirm"
            alt="img-confirm"
          />
        </div>
        <p className="confirmtitlemsg">
          {texts.screen.confirmation.titleConfirmError}
        </p>
        <div className="btnwrapper">
          <div className="confirmbtn">
            <Button
              data={reloadConfirmBtn}
              onClick={() => {
                history.push("/payment/concept");
              }}
            />
          </div>
          <div className="confirmbtn">
            <Button
              data={homeConfirmBtn}
              onClick={() => {
                history.push("/");
              }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="paymentconfirm-container">
        {isConfirmError ? renderError() : renderSuccess()}
      </div>
    </>
  );
};
export default PaymentConfirmation;
