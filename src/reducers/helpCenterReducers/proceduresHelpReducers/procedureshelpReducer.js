import { typesRequestErrors } from "../../../constants/error.constant";
import { types } from "../../../types/types";

const initialState = {
  faqs: null,
  tickets: null,
  recordType: null,
  recordTypeId: null,
  information: {
    optionsCheckboxes: [],
    value: null,
  }
};

export const proceduresHelpReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.helpCenterProceduresInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.helpCenterProceduresTickets:
      return {
        ...state,
        tickets: action.payload.tickets,
      };
      case types.helpCenterProceduresRecordType:
        return {
          ...state,
          recordType: action.payload.recordType,
        };
        case types.helpCenterProceduresRecordTypeId:
          return {
            ...state,
            recordTypeId: action.payload.recordTypeId,
          };
    case types.helpCenterProceduresFaqs:
      return {
        ...state,
        faqs: action.payload.faqs,
      };
    case types.helpCenterErrors:
      return proceduresHelpErrorReducer(state, action);
    case types.helpCenterProceduresReset:
      return {
        ...state,
        information: {
          optionsCheckboxes: [],
          recordTypeId: null,
        }
      };
    default:
      return state;
  }
};


const proceduresHelpErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getProceduresCheckboxes:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getProceduresCheckboxes]:
            action.payload[typesRequestErrors.getProceduresCheckboxes],
        },
      };
    default:
      return state;
  }
};
