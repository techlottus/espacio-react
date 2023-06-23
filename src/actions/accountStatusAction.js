import { types } from "../types/types";

export const setAccountProfile = (response) => {
  return {
    type: types.accountStatusSetProfile,
    payload: {
      profile: response,
    },
  };
};

export const setErrorAccountStatus = (typeError, isError, msg) => {
  return {
    type: types.accountStatusError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg,
      },
    },
  };
};

export const setDebitPeriod = (response) => {
  return {
    type: types.accountStatussSetDebitPeriod,
    payload: {
      debitPeriods: response
    },
  };
};

export const setAccountMovements = (response) => {
  return {
    type: types.accountMovements,
    payload: {
      movements: response
    },
  };
};

export const setAccountStatusPrograms = (response) => {
  return {
    type: types.accountStatusPrograms,
    payload: {
      programs: response
    },
  };
};
