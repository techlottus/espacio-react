import { types } from "../../types/types";

export const setProgramChangeInformation = (info) => {
  return {
    type: types.procedureProgramChangeInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setProgramChangeData = (data) => {
  return {
    type: types.procedureProgramChangeData,
    payload: {
      data: {
        comments: data.comments || null,
        phone: data.phone || null,
      },
    },
  };
};

export const setProgramChangeReset = () => {
  return {
    type: types.procedureProgramChangeReset,
    payload: {},
  };
};

export const setErrorsProgramChange = (typeError,isError,msg) => {
  return {
    type: types.procedureProgramChangeError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}