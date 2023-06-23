import { types } from "../../types/types";

const initialState = {
  information: {
    phone: null,
    optionsTypeCredential: null,
    optionsCredentialRequest: null,
    optionsCampusDelivery: null
  },
  data: {
    selectCampusDelivery: null,
    selectTypeCredential: null,
    selectTypeCredentialRequest: null,
    phone: null,
  }
};

export const credentialReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureCredentialInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureCredentialDoc:
      return {
        ...state,
        document: action.payload.doc,
      };
    case types.procedureCredentialData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.procedureCredentialReset:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

