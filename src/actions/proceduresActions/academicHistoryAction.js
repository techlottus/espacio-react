import { types } from "../../types/types";

export const setAcademicHistoryInformation = (info) => {
  return {
    type: types.procedureAcademicHistoryInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setAcademicHistoryDocument = (file) => {
  return {
    type: types.procedureAcademicHistoryDoc,
    payload: {
      document: file,
    },
  };
};

export const setAcademicHistoryData = (data) => {
  return {
    type: types.procedureAcademicHistoryData,
    payload: { 
      data: {
        selectCampusDelivery: data.selectCampusDelivery || null,
        selectTypeDelivery: data.selectTypeDelivery || null,
        comments: data.comments || null,
        phone: data.phone || null,
      },
    },
  };
};

export const setAcademicHistoryReset = () => {
  return {
    type: types.procedureAcademicHistoryReset,
    payload: {},
  };
};

export const setErrorsAcademic = (typeError,isError,msg) => {
  return {
    type: types.procedureAcademicHistoryError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}
