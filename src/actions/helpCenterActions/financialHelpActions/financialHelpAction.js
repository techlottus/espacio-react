import { types } from "../../../types/types";

export const setFinancialHelpInformation = (info) => {
  return {
    type: types.helpCenterFinancialInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setFinancialHelpTickets = (tickets) => {
  return {
    type: types.helpCenterFinancialTickets,
    payload: {
      tickets,
    },
  };
};

export const setFinancialHelpRecordType = (recordType) => {
  return {
    type: types.helpCenterFinancialRecordType,
    payload: {
      recordType,
    },
  };
};


export const setFinancialHelpFaqs = (faqs) => {
  return {
    type: types.helpCenterFinancialFaqs,
    payload: {
      faqs
    },
  };
};

export const setFinancialHelpReset = () => {
  return {
    type: types.helpCenterFinancialReset,
    payload: {},
  };
};

export const setErrorsFinancialHelp = (typeError,isError,msg) => {
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

export const setAdsFinancialHelp = (optionsAds) => {
  return {
    type: types.helpCenterFinancialOptionsAds,
    payload: {
      optionsAds
    }
  }
}
