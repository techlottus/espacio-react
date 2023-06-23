import { typesRequestErrors } from "../constants/error.constant";
import { types } from "../types/types";

const initialState = {
  privacy_notice_agreed: false,
  terms_and_conditions_agreed: false,
  errors: {
    [typesRequestErrors.getPrivacyNotice]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.patchPrivacyNotice]: {
      isError: false,
      msg: null,
    },
  },
};



export const termsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.termsAndPrivacyGetStatus:
      return {
        ...state,
        privacy_notice_agreed: action.payload.privacy_notice_agreed,
        terms_and_conditions_agreed: action.payload.terms_and_conditions_agreed,
      };

    case types.termsPatchStatus:
      return {
        ...state,
        terms_and_conditions_agreed: action.payload.terms_and_conditions_agreed,
      };
    case types.privacyPatchStatus:
      return {
        ...state,
        privacy_notice_agreed: action.payload.privacy_notice_agreed,
      };
    case types.termsReset:
      return {
        ...initialState
      };
    case types.termsErrors:
      return termsErrorReducer(state,action);
    default:
      return state;
  }
};

const termsErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getPrivacyNotice:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getPrivacyNotice]:
            action.payload[typesRequestErrors.getPrivacyNotice],
        },
      };
    case typesRequestErrors.patchPrivacyNotice:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.patchPrivacyNotice]:
            action.payload[typesRequestErrors.patchPrivacyNotice],
        },
      };
    default:
      return state;
  }
};



export const setErrorGetPrivacyNotice = (typeError, isError, msg) => {
  return{
    type: types.termsErrors,
    typeError,
    payload:{
      [typeError]:{
        isError,
        msg
      }
    }
  }
}

export const setErrorPatchPrivacyNotice = (typeError, isError, msg) => {
  return{
    type: types.termsErrors,
    typeError,
    payload:{
      [typeError]:{
        isError,
        msg
      }
    }
  }
}
