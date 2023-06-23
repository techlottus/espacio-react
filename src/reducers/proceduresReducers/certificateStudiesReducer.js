import { types } from "../../types/types";

const initialState = {
  information: {
    phone: null,
    optionsTypeCertificate: [],
    optionsCertificateRequest: [],
    optionsTypeDelivery: [],
    optionsCampusDelivery: [],
  },
  data: {
    selectCampusDelivery: null,
    selectCertificateRequest: null,
    selectTypeCertificate: null,
    selectTypeDelivery: null,
    comments: null,
    phone: null,
  },
  extra: {
    cost: null,
    detailId: null,
  },
  document: null,
};

export const certificateStudyReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureCertificateStudyInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureCertificateStudyDoc:
      return {
        ...state,
        document: action.payload.doc,
      };
    case types.procedureCertificateStudyData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.procedureCertificateStudyReset:
      return {
        ...initialState,
      };
    case types.procedureCertificateStudyExtra:
      return {
        ...state,
        extra: action.payload.extra,
      };
    default:
      return state;
  }
};
