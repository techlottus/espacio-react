import { typesRequestErrors } from "../../../constants/error.constant";
import { types } from "../../../types/types";

const initialState = {
  search: {
    tickets: null,
    faqs: null
  },
  data: null,
  errors: {
    [typesRequestErrors.getFaqsHelp]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.getSearchHelp]: {
      isError: false,
      msg: null,
    },
  },
};

export const faqsHelpReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.helpCenterFaqsData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.helpCenterFaqsSearch:
      return {
        ...state,
        search: action.payload.search,
      };
    case types.helpCenterErrors:
      return faqsHelpErrorReducer(state, action);
    case types.helpCenterFaqsError:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const faqsHelpErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getFaqsHelp:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getFaqsHelp]:
            action.payload[typesRequestErrors.getFaqsHelp],
        },
      };
    case typesRequestErrors.getSearchHelp:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getSearchHelp]:
            action.payload[typesRequestErrors.getSearchHelp],
        },
      };
    default:
      return state;
  }
};
