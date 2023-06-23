import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { setAuth } from "../../actions/headersAction";
import { setLoading } from "../../actions/loadingAction";
import { setTokens } from "../../actions/loginAction";
import env from "../../enviroment/environment";
import { authCheck, getValuesOfAuth } from "../../helpers/auth";
import {
  clearCookiesAuth,
  setCookieAuthAndRefresh,
} from "../../helpers/cookies";
import "./Login.scss";
import { setSplash } from "../../actions/splashAction";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    dispatch(setSplash(true));
    const accesstoken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    if (accesstoken && refreshToken) {
      setCookieAuthAndRefresh(accesstoken, refreshToken);
      dispatch(setAuth(`Bearer ${accesstoken}`));
      dispatch(setTokens(accesstoken));
      authCheck()
        .then((check) => {
          dispatch(setLoading(false));
          if (check) {
            const { isTerms } = getValuesOfAuth();
            if (isTerms) {
              history.replace("/", { from: "login" });
            } else {
              history.replace("/terms", { from: "login" });
            }
          }
        })
        .catch((e) => {
          console.log(e)
          dispatch(setAuth(null));
          dispatch(setTokens(null));
          clearCookiesAuth();
          window.location.href = env.redirectLoginHome + "/login";
        });
    } else {
      clearCookiesAuth();
      window.location.href = env.redirectLoginHome + "/login";
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <></>;
};

export default Login;
