import { typesRequestErrors } from "../../constants/error.constant";
import { types } from "../../types/types";

const initialState = {
  information: {
    optionsCampusDelivery: [],
    optionsTypeDelivery: [],
    phone: null,
  },
  data: {
    selectCampusDelivery: null,
    selectTypeDelivery: null, 
    comments: null,
    phone: null,
  },
  document: null,
  errors: {
    [typesRequestErrors.postAcademicHistory]: {
      isError: false,
      msg: null,
    },
  },
};

export const academicHistoryReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureAcademicHistoryInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureAcademicHistoryDoc:
      return {
        ...state,
        document: action.payload.doc,
      };
    case types.procedureAcademicHistoryData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.paymentErrors:
      return academicHistoryErrors(state, action);
    case types.procedureAcademicHistoryReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const academicHistoryErrors = (state, action) => {
  if (action.typeError === typesRequestErrors.postAcademicHistory) {
    return {
      ...state,
      errors: {
        ...state.errors,
        [typesRequestErrors.postAcademicHistory]:
          action.payload[typesRequestErrors.postAcademicHistory],
      },
    };
  } else {
    return state;
  }
};
