import React from "react";
import { privacyContent } from "../../../constants/Terms.constant";
import '../TermsPublic.scss'

const PrivacyPub = () => {
  return (
    <div className="terms-public-page-container">
      <div className="terms-content">
        <h2 className="termshow-title">{privacyContent.title}</h2>
        {privacyContent.contents.map((content, i) => {
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
    </div>
  );
};

export default PrivacyPub;
