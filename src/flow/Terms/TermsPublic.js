import React, { useEffect, useState } from "react";
import { tabsInit } from "../../constants/Terms.constant";
import "./TermsPublic.scss";
import TermsPub from "./components/TermsPub";
import PrivacyPub from "./components/PrivacyPub";
import { Tabs } from "../../components/Tabs/Tabs";
import HeaderApp from "../../shared/HeaderApp/HeaderApp";
import FooterApp from "../../shared/FooterApp/FooterApp";
import { useProvideAuth } from "../../helpers/auth";
import { useHistory } from "react-router";
import env from "../../enviroment/environment";
import { useContainerHeigh } from "../../hooks/contentHeight";
import { useSelector } from "react-redux";

const TermsPublic = () => {
  const { texts } = useSelector((state) => state.texts);
  let { user: auth } = useProvideAuth();
  const history = useHistory();
  const {height} = useContainerHeigh(0)

  
  const [isPrivacy, setIsPrivacy] = useState(true);
  const [isTerms, setIsTerms] = useState(false);

  const onTab = (e) => {
    if (e.detail === "privacy") {
      setIsPrivacy(true);
      setIsTerms(false);
    } else if (e.detail === "terms") {
      setIsPrivacy(false);
      setIsTerms(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0,0)
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleBack = () => {
    if(auth) {
      history.push('/');
    }
    else {
      window.location.href = env.redirectLoginHome + '/login'
    }
  }

  return (
    <>
    <HeaderApp/>
    <div className="termspublic-page" style = {{minHeight: `calc(${height}px - 77px)`}}>
      <div className="arrow-wrap">
          <div className="terms-arrow" onClick={handleBack}>
            <span className="material-icons">{texts?.terms.arrowTerms.icon}</span>
            <p>{texts?.terms.arrowTerms.text}</p>
          </div>
      </div>
      <div className="tab-wrapper">
        <Tabs data={tabsInit} onTap={onTab} />
      </div>
      {isPrivacy ? <PrivacyPub /> : ""}
      {isTerms ? <TermsPub /> : ""}
      
    </div>
   
    <FooterApp/>
    </>
  );
};

export default TermsPublic;
