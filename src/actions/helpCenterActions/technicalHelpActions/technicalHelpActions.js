import { types } from "../../../types/types";

export const setTechnicalHelpInformation = (info) => {
  return {
    type: types.helpCenterTechnicalInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setTechnicalHelpTickets = (tickets) => {
  return {
    type: types.helpCenterTechnicalTickets,
    payload: {
      tickets,
    },
  };
};

export const setTechnicalHelpRecordType = (recordType) => {
  return {
    type: types.helpCenterTechnicalRecordType,
    payload: {
      recordType,
    },
  };
};


export const setTechnicalHelpFaqs = (faqs) => {
  return {
    type: types.helpCenterTechnicalFaqs,
    payload: {
      faqs
    },
  };
};

export const setTechnicalHelpReset = () => {
  return {
    type: types.helpCenterTechnicalReset,
    payload: {},
  };
};

export const setErrorsTechnicalHelp = (typeError,isError,msg) => {
  return {
    type: types.helpCenterTechnicalError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}

export const setAdsTechnicalHelp = (optionsAds) => {
  return {
    type: types.helpCenterTechnicalOptionsAds,
    payload: {
      optionsAds
    }
  }
}
