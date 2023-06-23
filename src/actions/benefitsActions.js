import { types } from "../types/types";

export const setBenefitsCards = (cards) => {
  return {
    type: types.benefitsCards,
    payload: {
      cards,
    },
  };
};


export const setBenefitsDetail = (detail) => {
  return {
    type: types.benefitsDetail, 
    payload: {
      detail
    }
  }

}

export const setErrorBenefits = (typeError, isError, msg) => {
  return {
    type: types.benefitsError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg,
      },
    },
  };
};
