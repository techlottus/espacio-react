import { types } from "../../types/types";

const initialState = {
  information: {
    phone: null,
    optionsTypeRecord: null,
    optionsTypeDelivery: null,
    optionsCampusDelivery: null,
  },
  data: {
    phone: null,
    selectTypeRecord: null,
    selectTypeDelivery: null,
    selectCampusDelivery: null,
    isCheck: false,
    comments: null,
  },
  extra: {
    cost: null,
    detailId: null,
  },
  document: null,
  modal: [],
};

export const studyRecordReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureStudyRecordInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureStudyRecordDoc:
      return {
        ...state,
        document: action.payload.document,
      };
    case types.procedureStudyRecordData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.proceduresStudyRecordExtra:
      return {
        ...state,
        extra: action.payload.extra,
      };
    case types.procedureStudyRecordModal:
      return {
        ...state,
        modal: action.payload.modal,
      };
    case types.procedureStudyRecordReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
