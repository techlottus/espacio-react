import { types } from "../../types/types";

const initialState = {
  information: {
    phone: null,
  },
  data: {
    phone: null,
    comments: null, 
    countryOfBirth: null,
    countryOfPriorStudies: null,
    schoolOfOrigin: null,
    dateStudiesStarted: null,
    dateStudiesFinished: null,
  },
};

export const admissionCertificateReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureAdmissionCertificateInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureAdmissionCertificateData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.procedureAdmissionCertificateReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
