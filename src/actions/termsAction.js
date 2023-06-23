import { types } from "../types/types";

import { typesTermsAndPrivacy } from "../constants/Terms.constant";

export const setPrivacy = (response) => {
  return {
    type: types.termsAndPrivacyGetStatus,
    payload: {
      privacy_notice_agreed: response.privacy_notice_agreed,
      terms_and_conditions_agreed: response.terms_and_conditions_agreed,
    },
  };
};

export const setTerms = (type) => {
  switch (type) {
    case typesTermsAndPrivacy.privacy:
      return {
        type: types.privacyPatchStatus,
        payload: {
          privacy_notice_agreed: true,
        },
      };
    case typesTermsAndPrivacy.terms:
      return {
        type: types.termsPatchStatus,
        payload: {
          terms_and_conditions_agreed: true,
        },
      };
    default:
      return {
        type: null,
        payload: null
      }
  }
};

export const resetTerms = () => {
  return {
    type: types.termsReset,
    payload: {}
  }
}

export const setErrorTerms = (typeError,isError,msg) => {
  return {
    type: types.termsErrors,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}
