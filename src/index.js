import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { getRefreshTokenHttp } from "./services/Login/loginService";
import { eventErrorAuth } from "./observables/eventError";
import { typeErrorAuth } from "./constants/Login.constant";
import { setCookieAuth } from "./helpers/cookies";
import { stopReportingRuntimeErrors } from "react-error-overlay";

axios.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (
      err.config &&
      err.response &&
      err.response.status === 403 &&
      err.config.headers["countretry"] === 0
    ) {
      return getRefreshTokenHttp()
        .then((token) => {
          setCookieAuth(token);
          let config = {
            ...err.config,
            headers: {
              ...err.config.headers,
              ["authorization"]: "Bearer " + token,
              ["countretry"]: err.config.headers["countretry"] + 1,
            },
          };
          return axios.request(config);
        })
        .catch(() => {
          eventErrorAuth.next(typeErrorAuth.error401);
        });
    }

    if (
      err.response &&
      err.response.status === 403 &&
      err.config.headers["countretry"] > 0
    ) {
      eventErrorAuth.next(typeErrorAuth.error401);
    }

    return Promise.reject(err);
  }
);



ReactDOM.render(
    <App />,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
