import { types } from "../../types/types";

export const setCredentialInformation = (info) => {
  return {
    type: types.procedureCredentialInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setCredentialDocuments = (file) => {
  return {
    type: types.procedureCredentialDoc,
    payload: {
      doc: file,
    },
  };
};

export const setCredentialData = (data) => {
  return {
    type: types.procedureCredentialData,
    payload: {
      data: {
        selectCampusDelivery: data.selectCampusDelivery || null,
        selectTypeCredential: data.selectTypeCredential || null,
        selectTypeCredentialRequest: data.selectTypeCredentialRequest || null,
        phone: data.phone || null,
      },
    },
  };
};

export const setCredentialReset = () => {
  return {
    type: types.procedureCredentialReset,
    payload: {},
  };
};
