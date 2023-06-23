import React, { useState, useEffect } from "react";
import { TermsContext } from "./TermsContext";
import TermsBtns from "./views/TermsBtns";
import TermsShow from "./views/TermsShow";
import { Navbar } from "../../components/Navbar/Navbar";
import { Menu } from "../../components/Menu/Menu";
import Welcome from "./views/Welcome";
import {
  privacyContent,
  termsContent,
  dataNavBar,
  dataMenu,
  typesTermsAndPrivacy,
  typeTermsBtn,
} from "../../constants/Terms.constant";
import "./Terms.scss";
import { Switch, useHistory, Route, Redirect } from "react-router-dom";
import {
  getPrivacyService,
  patchPrivacyService,
} from "../../middlewares/termsMiddelware";
import { useDispatch, useSelector } from "react-redux";
import { resetTerms, setErrorTerms } from "../../actions/termsAction";
import { typesRequestErrors } from "../../constants/error.constant";
import { setTokens } from "../../actions/loginAction";
import { setAuth } from "../../actions/headersAction";
import env from "../../enviroment/environment";
import { notiObs } from "../../observables/notificationObs";
import { typesNoti } from "../../types/typeNoti";
import {
  headerLogoHeaderTag,
  headerMenuOpenHeaderTag,
} from "../../tagging/flows/headerTag";
import { sendInfoTM } from "../../tagging/services/sendInfoTagManager";
import { privacyBtnTermsTag } from "../../tagging/flows/termsTag";
import { getImageOfAssetsMark } from "../../helpers/getImages";

const Terms = () => {
  const history = useHistory();

  const [menu] = useState({
    ...dataMenu,
    disabledBtnClose: window.innerWidth < 991,
  });
 
  const termsStore = useSelector((state) => state.terms);
  const { texts } = useSelector((state) => state.texts);

  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState(false);

  const onRight = (e) => {
    switch (e.detail) {
      case "apps":
        setIsModal((prevIsModal) => !prevIsModal);
        break;
      case "notifications":
        break;
      default:
        break;
    }
  };

  const [desktop, setDesktop] = useState(window.innerWidth > 991);
  const [terms, showTerms] = useState({
    terms: false,
    privacy: false,
    init: true,
  });

  const clickTerms = () => {
    if (!termsStore.terms_and_conditions_agreed) {
      showTerms({
        terms: true,
        privacy: false,
      });
    }
  };

  const clickPrivacy = () => {
    if (!termsStore.privacy_notice_agreed) {
      showTerms({
        terms: false,
        privacy: true,
      });
    }
  };

  const redirectTerms = () => {
    if (window.innerWidth < 991 && !termsStore.terms_and_conditions_agreed) {
      history.push("/terms/terms-and-conditions");
    }
  };

  const redirectPrivacy = () => {
    if (window.innerWidth < 991 && !termsStore.privacy_notice_agreed) {
      history.push("/terms/advice-privacy");
      sendInfoTM(window, privacyBtnTermsTag);
    }
  };

  const clickShow = (typeBtn, type) => {
    switch (typeBtn) {
      case typeTermsBtn.accept:
        dispatch(patchPrivacyService(type, history, showTerms));
        break;
      case typeTermsBtn.decline:
        showTerms({
          terms: false,
          privacy: false,
          init: true,
        });
        history.replace("/terms");
        break;
      default:
        break;
    }
  };

  const updateMedia = () => {
    setDesktop(window.innerWidth > 991);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  useEffect(() => {
    dispatch(getPrivacyService(history));

    return () => {
      dispatch(resetTerms());
      dispatch(
        setErrorTerms(typesRequestErrors.patchPrivacyNotice, false, null)
      );
      dispatch(setErrorTerms(typesRequestErrors.getPrivacyNotice, false, null));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      termsStore.errors &&
      termsStore.errors[typesRequestErrors.patchPrivacyNotice].isError
    ) {
      notiObs.next({
        type: typesNoti.error,
        text: termsStore.errors[typesRequestErrors.patchPrivacyNotice].msg,
      });
    }

    if (
      termsStore.errors &&
      termsStore.errors[typesRequestErrors.getPrivacyNotice].isError
    ) {
      notiObs.next({
        type: typesNoti.error,
        text: termsStore.errors[typesRequestErrors.getPrivacyNotice].msg,
      });
    }
  }, [termsStore.errors]);

  const onLogo = () => {
    history.push("/terms");
  };
  const welcomeMsg = () => {
    if(terms.init ){
          if (
      termsStore.privacy_notice_agreed &&
      termsStore.terms_and_conditions_agreed
    ) {
      return (
        <Welcome
          key="init"
          title={texts?.terms.welcomeTitle.welcomeThanks}
          image={getImageOfAssetsMark(texts?.terms?.images?.thankyouTerms)}
        />
      );
    } else {
      return (
        <Welcome
          key="end"
          title={texts?.terms.welcomeTitle.welcomeIntro}
          image={getImageOfAssetsMark(texts?.terms?.images?.welcomeTerms)}
        />
      );
    }
    }
  };

  const privacyView = () => {
    if(terms.privacy){
      return (
        <TermsShow
          title={privacyContent.title}
          contents={privacyContent.contents}
          type={typesTermsAndPrivacy.privacy}
          clickShow={clickShow}
        />
      );
    }

  };

  const termsView = () => {
    if(terms.terms){
      return (
        <TermsShow
          title={termsContent.title}
          contents={termsContent.contents}
          type={typesTermsAndPrivacy.terms}
          clickShow={clickShow}
        />
      );
    }
  };

  return (
    <>
      <TermsContext.Provider value={null}>
        <div className="navbar">
          <Navbar
            data={dataNavBar}
            onRight={(e) => {
              onRight(e);
              sendInfoTM(window, headerMenuOpenHeaderTag, "open");
            }}
            onLogo={() => {
              onLogo();
              sendInfoTM(window, headerLogoHeaderTag);
            }}
          />
          {isModal ? (
            <div className="menu">
              <Menu
                data={menu}
                onCard={(e) => {
                  if (e.detail === "back") {
                    dispatch(setTokens(null, null));
                    dispatch(setAuth(null));
                    sessionStorage.removeItem(env.campusvirtual_token);
                    window.location.href = env.logout;
                  }
                }}
                onClose={() => {
                  setIsModal(!isModal);
                  sendInfoTM(window, headerMenuOpenHeaderTag, "close");
                }}
                outside={() => {
                  setIsModal(false);
                  sendInfoTM(window, headerMenuOpenHeaderTag, "close");
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        <Switch>
          <Route path="/terms/advice-privacy">
            <TermsShow
              title={privacyContent.title}
              contents={privacyContent.contents}
              type={typesTermsAndPrivacy.privacy}
              clickShow={clickShow}
            />
          </Route>
          <Route path="/terms/terms-and-conditions">
            <TermsShow
              title={termsContent.title}
              contents={termsContent.contents}
              type={typesTermsAndPrivacy.terms}
              clickShow={clickShow}
            />
          </Route>
          <Route exact path="/terms/">
            <div className="terms-view">
              {desktop ? (
                <div className="desktop-container">
                  <div className="termscontent">
                    <TermsBtns
                      onClickTerms={clickTerms}
                      onClickPrivacy={() => {
                        clickPrivacy();
                        sendInfoTM(window, privacyBtnTermsTag);
                      }}
                    />
                  </div>
                  <div className="termsprivacywrap">
                    { welcomeMsg()}
                    {privacyView()}
                    {termsView()}
                  </div>
                </div>
              ) : (
                <TermsBtns
                  onClickTerms={redirectTerms}
                  onClickPrivacy={redirectPrivacy}
                />
              )}
            </div>
          </Route>
          <Redirect to="/terms/" />
        </Switch>
      </TermsContext.Provider>
    </>
  );
};

export default Terms;
