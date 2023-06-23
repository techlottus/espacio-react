import { types } from "../../types/types";

export const setEquivalenceStudiesInformation = (info) => {
  return {
    type: types.procedureEquivalenceStudiesInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setEquivalenceStudiesDocument = (file) => {
  return {
    type: types.procedureEquivalenceStudiesDoc,
    payload: {
      document: file,
    },
  };
};

export const setEquivalenceStudiesData = (data) => {
  return {
    type: types.procedureEquivalenceStudiesData,
    payload: {
      data: {
        comments: data.comments || null,
        phone: data.phone || null,
      },
    },
  };
};

export const setEquivalenceStudiesReset = () => {
  return {
    type: types.procedureEquivalenceStudiesReset,
    payload: {},
  };
};

export const setErrorsEquivalenceStudies = (typeError,isError,msg) => {
  return {
    type: types.procedureEquivalenceStudiesError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}
