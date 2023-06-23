import React, { useEffect } from "react";
import "lottus-login/login";
import { Button } from "../Button/Button";
import { buttonLogin, imgLogoLogin } from "../../constants/Login.constant";
import { getImageOfAssetsMark } from "../../helpers/getImages";

export const ViewLogin = React.memo(({ isInputs, isForgot, onForm, onPrivacyTerms }) => {
  const loginRef = React.createRef();

  useEffect(() => {
    loginRef.current.isInputs = true;
    loginRef.current.isForgot = true; 
  }, [isInputs,isForgot]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    loginRef.current.imgLogin = getImageOfAssetsMark(texts?.login?.images?.imgLogin);
    loginRef.current.imgLogo = imgLogoLogin;
    loginRef.current.addEventListener('onPrivacyTerms', onPrivacyTerms);
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <lottus-login ref={loginRef} >
        <div buttonsubmit="">
          <Button data={buttonLogin} onClick={onForm} />
        </div>
      </lottus-login>
    </>
  );
});
