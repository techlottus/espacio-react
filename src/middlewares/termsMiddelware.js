import {
  getPrivacyNoticeHttp,
  patchPrivacyNoticeHttp,
} from "../services/dashboard/termsService";
import { setTerms, setPrivacy, setErrorTerms } from "../actions/termsAction";
import { typesTermsAndPrivacy } from "../constants/Terms.constant";
import { setLoading } from "../actions/loadingAction";
import { typesRequestErrors } from "../constants/error.constant";
import { setSplash } from "../actions/splashAction";
import { originFromLogin } from "../helpers/actionsHistory";

export const getPrivacyService = (history) => {
  return (dispatch) => {
    const isLogin = originFromLogin(history);
    if (isLogin) {
      dispatch(setSplash(true));
    } else {
      dispatch(setLoading(true));
    }

    getPrivacyNoticeHttp()
      .then((res) => {
        if (isLogin) {
          setTimeout(() => {
            dispatch(setSplash(false));
            dispatch(
              setErrorTerms(typesRequestErrors.getPrivacyNotice, false, null)
            );
            if (res.privacy_notice_agreed && res.terms_and_conditions_agreed) {
              history.replace("/");
            } else {
              dispatch(setPrivacy(res));
            }
          }, 2000);
        } else {
          dispatch(setLoading(false));
          dispatch(
            setErrorTerms(typesRequestErrors.getPrivacyNotice, false, null)
          );
          if (res.privacy_notice_agreed && res.terms_and_conditions_agreed) {
            history.replace("/");
          } else {
            dispatch(setPrivacy(res));
          }
        }
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(setSplash(false));
        dispatch(
          setErrorTerms(typesRequestErrors.getPrivacyNotice, true, message)
        );
      });
  };
};

export const patchPrivacyService = (type, history, showTerms) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    patchPrivacyNoticeHttp(type)
      .then(() => {
        dispatch(setLoading(false));
        dispatch(
          setErrorTerms(typesRequestErrors.patchPrivacyNotice, false, null)
        );
        switch (type) {
          case typesTermsAndPrivacy.privacy:
            dispatch(setTerms(type));
            history.push("/terms");
            showTerms({
              terms: true,
              privacy: false,
              init: false,
            });
            break;
          case typesTermsAndPrivacy.terms:
            dispatch(setTerms(type));
            history.push("/terms");
            showTerms({
              terms: false,
              privacy: false,
              init: true,
            });
            break;
          case typesTermsAndPrivacy.promotions:
            history.replace("/");
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorTerms(typesRequestErrors.patchPrivacyNotice, true, message)
        );
      });
  };
};

