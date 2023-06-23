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
  optionsAds: null,
  errors: {
    [typesRequestErrors.getTechnicalCheckboxes]: {
      isError: false,
      msg: null,
    },
  },
};

export const TechnicalHelpReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.helpCenterTechnicalInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.helpCenterTechnicalTickets:
      return {
        ...state,
        tickets: action.payload.tickets,
      };
    case types.helpCenterTechnicalRecordType:
      return {
        ...state,
        recordType: action.payload.recordType,
      };
    case types.helpCenterTechnicalFaqs:
      return {
        ...state,
        faqs: action.payload.faqs,
      };
    case types.helpCenterTechnicalOptionsAds:
      return {
        ...state,
        optionsAds: action.payload.optionsAds,
      };
    case types.helpCenterErrors:
      return TechnicalHelpErrorReducer(state, action);
    case types.helpCenterTechnicalReset:
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

const TechnicalHelpErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getTechnicalCheckboxes:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getTechnicalCheckboxes]:
            action.payload[typesRequestErrors.getTechnicalCheckboxes],
        },
      };
    default:
      return state;
  }
};
