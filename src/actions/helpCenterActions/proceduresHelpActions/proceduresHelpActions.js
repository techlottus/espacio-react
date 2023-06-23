import { types } from "../../../types/types";

export const setProceduresHelpInformation = (info) => {
  return {
    type: types.helpCenterProceduresInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setProceduresHelpTickets = (tickets) => {
  return {
    type: types.helpCenterProceduresTickets,
    payload: {
      tickets,
    },
  };
};

export const setProceduresHelpRecordType = (recordType) => {
  return {
    type: types.helpCenterProceduresRecordType,
    payload: {
      recordType,
    },
  };
};

export const setProceduresHelpRecordTypeId = (recordTypeId) => {
  return {
    type: types.helpCenterProceduresRecordTypeId,
    payload: {
      recordTypeId,
    },
  };
};

export const setProceduresHelpFaqs = (faqs) => {
  return {
    type: types.helpCenterProceduresFaqs,
    payload: {
      faqs
    },
  };
};

export const setProceduresHelpReset = () => {
  return {
    type: types.helpCenterProceduresReset,
    payload: {},
  };
};

export const setErrorsProceduresHelp = (typeError,isError,msg) => {
  return {
    type: types.helpCenterProceduresError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}
