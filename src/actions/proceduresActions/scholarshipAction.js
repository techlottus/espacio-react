import { types } from "../../types/types";

export const setScholarshipInformation = (info) => {
  return {
    type: types.procedureScholarshipInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setScholarshipData = (data) => {
  return {
    type: types.procedureScholarshipData,
    payload: {
      data: {
        comments: data.comments || null,
        phone: data.phone || null,
      },
    },
  };
};

export const setScholarshipReset = () => {
  return {
    type: types.procedureScholarshipReset,
    payload: {},
  };
};

export const setErrorsScholarship = (typeError,isError,msg) => {
  return {
    type: types.procedureScholarshipError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}

export const setScholarshipRenovationType = (renovationTypes) => {
  return {
    type: types.procedureScholarshipRenovationType,
    payload: {
      renovationTypes
    },
  };
};