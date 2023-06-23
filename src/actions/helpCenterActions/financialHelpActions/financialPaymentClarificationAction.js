import { types } from "../../../types/types";

export const setPaymentClarificationInformation = (info) => {
  return {
    type: types.helpCenterFinancialInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setPaymentClarificationDocument = (file) => {
  return {
    type: types.helpCenterFinancialDoc,
    payload: {
      document: file,
    },
  };
};

export const setPaymentClarificationData = (data, recordId) => {
  return {
    type: types.helpCenterFinancialData,
    payload: {
      data: {
        selectCheckboxes: data.selectedCheckboxes || null,
        description: data.description || null,
        recordTypeId: recordId || null,

      },
    },
  };
};

export const setPaymentClarificationReset = () => {
  return {
    type: types.helpCenterFinancialReset,
    payload: {},
  };
};

export const setErrorsPaymentClarification = (typeError,isError,msg) => {
  return {
    type: types.helpCenterFinancialError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}
