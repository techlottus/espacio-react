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
  optionsAds: null
};

export const academicHelpReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.helpCenterAcademicInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.helpCenterAcademicTickets:
      return {
        ...state,
        tickets: action.payload.tickets,
      };
    case types.helpCenterAcademicRecordType:
      return {
        ...state,
        recordType: action.payload.recordType,
      };
    case types.helpCenterAcademicFaqs:
      return {
        ...state,
        faqs: action.payload.faqs,
      };
      case types.helpCenterAcademicOptionsAds:
        return {
          ...state,
          optionsAds: action.payload.optionsAds,
        };
    case types.helpCenterErrors:
      return academicHelpErrorReducer(state, action);
    case types.helpCenterAcademicReset:
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

const academicHelpErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getAcademicCheckboxes:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getAcademicCheckboxes]:
            action.payload[typesRequestErrors.getAcademicCheckboxes],
        },
      };
    default:
      return state;
  }
};
