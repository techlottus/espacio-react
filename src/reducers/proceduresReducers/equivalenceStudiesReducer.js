import { typesRequestErrors } from "../../constants/error.constant";
import { types } from "../../types/types";

const initialState = {
  information: {
    phone: null,
  },
  data: {
    comments: null,
    phone: null,
  },
  document: null,
  errors: {
    [typesRequestErrors.postEquivalenceStudies]: {
      isError: false,
      msg: null,
    },
  },
};

export const equivalenceStudiesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureEquivalenceStudiesInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureEquivalenceStudiesDoc:
      return {
        ...state,
        document: action.payload.doc,
      };
    case types.procedureEquivalenceStudiesData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.paymentErrors:
      return equivalenceStudiesErrors(state, action);
    case types.procedureEquivalenceStudiesReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const equivalenceStudiesErrors = (state, action) => {
  if (action.typeError === typesRequestErrors.postEquivalenceStudies) {
    return {
      ...state,
      errors: {
        ...state.errors,
        [typesRequestErrors.postEquivalenceStudies]:
          action.payload[typesRequestErrors.postEquivalenceStudies],
      },
    };
  } else {
    return state;
  }
};
