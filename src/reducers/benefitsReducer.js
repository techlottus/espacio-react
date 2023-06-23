import { typesRequestErrors } from "../constants/error.constant";
import { types } from "../types/types";

const initialState = {
  cards: null,
  detail: null,
  errors: {
    [typesRequestErrors.getBenefits]: {
      isError: false,
      msg: null,
    },
  },
};

export const BenefitsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.benefitsCards:
      return {
        ...state,
        cards: action.payload.cards,
      };
    case types.benefitsDetail:
      return {
        ...state,
        detail: action.payload.detail,
      };
    case types.benefitsError:
      return benefitsErrorReducer(state, action);
    case types.benefitsReset:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

const benefitsErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getBenefits:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getBenefits]:
            action.payload[typesRequestErrors.getBenefits],
        },
      };
    default:
      return state;
  }
};
