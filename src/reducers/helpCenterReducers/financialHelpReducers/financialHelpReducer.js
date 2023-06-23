import { typesRequestErrors } from "../../../constants/error.constant";
import { types } from "../../../types/types";

const initialState = {
  faqs: null,
  tickets: null,
  recordType: null,
  information: {
    optionsCheckboxes: [],
    recordTypeId: null,
  },
  errors: {
    [typesRequestErrors.getFinancialCheckboxes]: {
      isError: false,
      msg: null,
    },
  },
  optionsAds: null
};

export const financialHelpReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.helpCenterFinancialInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.helpCenterFinancialTickets:
      return {
        ...state,
        tickets: action.payload.tickets,
      };
    case types.helpCenterFinancialOptionsAds:
      return {
        ...state,
        optionsAds: action.payload.optionsAds,
      };
    case types.helpCenterFinancialRecordType:
      return {
        ...state,
        recordType: action.payload.recordType,
      };
    case types.helpCenterFinancialFaqs:
      return {
        ...state,
        faqs: action.payload.faqs,
      };
    case types.helpCenterErrors:
      return financialHelpErrorReducer(state, action);
    case types.helpCenterFinancialReset:
      return {
        ...state,
        information: {
          optionsCheckboxes: [],
          recordTypeId: null,
        },
      };
    default:
      return state;
  }
};

const financialHelpErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getFinancialCheckboxes:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getFinancialCheckboxes]:
            action.payload[typesRequestErrors.getFinancialCheckboxes],
        },
      };
    default:
      return state;
  }
};
