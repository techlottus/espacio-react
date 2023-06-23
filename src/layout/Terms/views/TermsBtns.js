import React, { useEffect, useState } from "react";
import { Button } from "../../../components/Button/Button";
import { ProgressBar } from "../../../components/ProgressBar/ProgressBar";
import { Toggle } from "../../../components/Toggle/Toggle";
import {
  dataTerms,
  dataPrivacy,
  dataProgress,
  sendBtn,
  toggleData,
  typesTermsAndPrivacy,
} from "../../../constants/Terms.constant";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import "./TermsBtns.scss";
import { patchPrivacyService } from "../../../middlewares/termsMiddelware";
import { sendInfoTM } from "../../../tagging/services/sendInfoTagManager";
import { switchOnTermsTag } from "../../../tagging/flows/termsTag";
import { testTermsTitle } from "../../../constants/test/testTerms";
const TermsBtns = ({ onClickTerms, onClickPrivacy }) => {

  const { texts } = useSelector((state) => state.texts);

  const [btnTerms, btnInitTerms] = useState({
    ...dataTerms,
    icon: "",
    disabled: true,
    title: texts?.terms.btns.btnTerms,
  });
  const [btnPrivacy, btnInitPrivacy] = useState({
    ...dataPrivacy,
    icon: "",
    title: texts?.terms.btns.btnPrivacy,
  });
  const [btnSend, setBtnSend] = useState({
    ...sendBtn,
    disabled: true,
    title: texts?.terms.btns.btnEnter,
  });
  const [isToogle, setIsToogle] = useState({
    ...toggleData
  });


  const [progressData, setProgressData] = useState({
    ...dataProgress,
    progress: 0,
    description: texts?.terms.progress.progressZero,
  });

  const [nextPrivacy, setNextPrivacy] = useState(false);
  const [nextTerms, setNextTerms] = useState(false);

  const termsStore = useSelector((state) => state.terms);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (termsStore.privacy_notice_agreed) {
      btnInitPrivacy({ ...dataPrivacy, icon: "done", disabled: true });
      setProgressData({
        ...dataProgress,
        progress: 50,
        description: texts?.terms.progress.progressMiddle,
      });
      btnInitTerms({ ...dataTerms, icon: "", disabled: false });
    }
    if (termsStore.terms_and_conditions_agreed) {
      btnInitTerms({ ...dataTerms, icon: "done", disabled: true });
      setProgressData({
        ...dataProgress,
        progress: 100,
        description: texts?.terms.progress.progressComplete,
      });
    }
    if (
      termsStore.privacy_notice_agreed &&
      termsStore.terms_and_conditions_agreed
    ) {
      setBtnSend({
        ...btnSend,
        disabled: false,
      });
    }
  }, [termsStore]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (nextPrivacy) {
      onClickPrivacy();
    }
  }, [nextPrivacy]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (nextTerms) {
      onClickTerms();
    }
  }, [nextTerms]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="terms-container">
      <h2 className="termsbtns-title">{texts?.terms.title}</h2>
      <p className="termsbtns-text">{texts?.terms.subTitle}</p>

      <div className="buttons">
        <div className="button-wrap">
          <Button
            key="privacy-btn"
            data={{
              ...btnPrivacy,
              test: testTermsTitle.btnPrivacyAction
            }}
            onClick={() => setNextPrivacy((state) => !state)}
          />
        </div>
        <div className="button-wrap second-btn">
          <Button
            data={{
              ...btnTerms,
              test: testTermsTitle.btnTermsAction
            }}
            onClick={() => setNextTerms((state) => !state)}
          />
        </div>
      </div>
      <div className="newsletter-wrap">
        <Toggle
          data={{
            ...isToogle,
            test: testTermsTitle.toogleTerms
          }}
          onSwitch={(e) => {
            setIsToogle({...isToogle, status:e.detail});
            e.detail ? sendInfoTM(window, switchOnTermsTag, 'on') :  sendInfoTM(window, switchOnTermsTag, 'off')
          }}
        />
        <p className="termsbtns-text">{texts?.terms.toggle}</p>
      </div>
      <div className="progress-bar">
        <ProgressBar data={progressData} />
      </div>
      <div className="send-btn">
        <Button
          data={{
            ...btnSend,
            test: testTermsTitle.btnFinish
          }}
          onClick={() => {
            dispatch(
              patchPrivacyService(
                typesTermsAndPrivacy.promotions,
                history,
                null
              )
            );
          }}
        />
      </div>
    </div>
  );
};

export default TermsBtns;
