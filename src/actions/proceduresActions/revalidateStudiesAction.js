import { types } from "../../types/types";

export const setRevalidateStudiesInformation = (info) => {
  return {
    type: types.procedureRevalidateStudiesInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setRevalidateStudiesDocument = (file) => {
  return {
    type: types.procedureRevalidateStudiesDoc,
    payload: {
      document: file,
    },
  };
};

export const setRevalidateStudiesOneData = (data) => {
  return {
    type: types.procedureRevalidateStudiesOneData,
    payload: {
      data: {
        ...data
      }
    },
  };
};

export const setRevalidateStudiesTwoData = (data) => {
  return {
    type: types.procedureRevalidateStudiesTwoData,
    payload: {
      data: {
        ...data
      }
    },
  };
};

export const setRevalidateStudiesReset = () => {
  return {
    type: types.procedureRevalidateStudiesReset,
    payload: {},
  };
};

export const setErrorsRevalidateStudies = (typeError,isError,msg) => {
    return {
      type: types.procedureRevalidateStudiesError,
      typeError,
      payload: {
        [typeError]: {
          isError,
          msg
        }
      }
    }
  }

