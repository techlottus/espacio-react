import { typesRequestErrors } from "../../constants/error.constant";
import { types } from "../../types/types";

const initialState = {
  requestInquiryAll: null,
  proceduresAllOne: null,
  proceduresAllTwo: null,
  profile: null,
  pathExit: null,
  errors: {
    [typesRequestErrors.getInformationProcedures]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.getRequestInquiryProcedures]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.getCostsProcedures]: {
      isError: false,
      msg: null,
    },
  },
  extra: null,
};

export const proceduresReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.proceduresSetRequestInquiry:
      return {
        ...state,
        requestInquiryAll: action.payload.requestInquiryAll,
      };
    case types.proceduresSetAll:
      return {
        ...state,
        proceduresAllOne: action.payload.proceduresAllOne,
        proceduresAllTwo: action.payload.proceduresAllTwo,
      };
    case types.proceduresSetProfile:
      return {
        ...state,
        profile: action.payload.profile,
      };
    case types.proceduresSetExtraAll:
      return {
        ...state,
        extra: action.payload.extra,
      };
    case types.proceduresPathExit:
      return {
        ...state,
        pathExit: action.payload.pathExit,
      };
    case types.proceduresErrors:
      return proceduresErrorReducer(state, action);
    case types.proceduresReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const proceduresErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getInformationProcedures:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getInformationProcedures]:
            action.payload[typesRequestErrors.getInformationProcedures],
        },
      };
    case typesRequestErrors.getRequestInquiryProcedures:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getRequestInquiryProcedures]:
            action.payload[typesRequestErrors.getRequestInquiryProcedures],
        },
      };
    case typesRequestErrors.getCostsProcedures:
      return {
        ...state,
        errors: {
          ...state.errors,
          [typesRequestErrors.getCostsProcedures]:
            action.payload[typesRequestErrors.getCostsProcedures],
        },
      };
    default:
      return state;
  }
};
