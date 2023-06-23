import React, { useState } from "react";
import Notification from "../views/Notification";
import { Button } from "../../../components/Button/Button";
import { termsBtns } from "../../../constants/Terms.constant";

import "./TermsShow.scss";
import { Link } from "react-router-dom";
import { texts } from "../../../texts/indexText";
import { sendInfoTM } from "../../../tagging/services/sendInfoTagManager";
import {
  privacyBtnDeclinedTermsTag,
  termsBtnDeclinedTermsTag,
} from "../../../tagging/flows/termsTag";
import { testTermsTitle } from "../../../constants/test/testTerms";

const TermsShow = ({ title, contents, clickShow, type }) => {
  const [btns] = useState([...termsBtns]);

  return (
    <div className="terms-page">
      <div className="terms-page-container">
        <Link to="/terms">
          <div className="terms-arrow">
            <span className="material-icons">arrow_back</span>
          </div>
        </Link>
        <div className="terms-content">
          <h2 className="termshow-title">{title}</h2>
          {contents.map((content, i) => {
            return (
              <div className="terms-map" key={i}>
                <h3 className="termshow-subtitle">{content.subtitle}</h3>
                <div
                  className="termshow-texts"
                  dangerouslySetInnerHTML={{ __html: content.text }}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="terms-feed">
          <Notification icon={"info"} text={texts?.terms.notification} />
        </div>
        <div className="terms-btns">
          {btns.map((data, index) => {
            return (
              <div className="button-wrap" key={index}>
                <Button
                  data={{
                    ...data,
                    test: testTermsTitle.btnTermsAndPrivacyAction + '-' +type + '-' +data.id
                  }}
                  onClick={() => {
                    clickShow(data.id, type);
                    type === "privacy" && data.id === "decline"
                      ? sendInfoTM(
                          window,
                          privacyBtnDeclinedTermsTag,
                          "noacepto"
                        )
                      : sendInfoTM(
                          window,
                          privacyBtnDeclinedTermsTag,
                          "acepto"
                        );
                    type === "terms" && data.id === "decline"
                      ? sendInfoTM(window, termsBtnDeclinedTermsTag, "noacepto")
                      : sendInfoTM(window, termsBtnDeclinedTermsTag, "acepto");
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TermsShow;
