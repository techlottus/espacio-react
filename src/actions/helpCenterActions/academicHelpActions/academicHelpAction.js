import { types } from "../../../types/types";

export const setAcademicHelpInformation = (info) => {
  return {
    type: types.helpCenterAcademicInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setAcademicHelpTickets = (tickets) => {
  return {
    type: types.helpCenterAcademicTickets,
    payload: {
      tickets,
    },
  };
};

export const setAcademicHelpRecordType = (recordType) => {
  return {
    type: types.helpCenterAcademicRecordType,
    payload: {
      recordType,
    },
  };
};

export const setAcademicHelpFaqs = (faqs) => {
  return {
    type: types.helpCenterAcademicFaqs,
    payload: {
      faqs
    },
  };
};

export const setAcademicHelpReset = () => {
  return {
    type: types.helpCenterAcademicReset,
    payload: {},
  };
};

export const setErrorsAcademicHelp = (typeError,isError,msg) => {
  return {
    type: types.helpCenterAcademicError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}

export const setAdsAcademicHelp = (optionsAds) => {
  return {
    type: types.helpCenterAcademicOptionsAds,
    payload: {
      optionsAds
    }
  }
}
