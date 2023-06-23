import { typesRequestErrors } from "../../../constants/error.constant";
import { types } from "../../../types/types";

const initialState = {
  data: null,
  requestInquiryAll: null,
  errors: {
    [typesRequestErrors.getDashboardHelp]: {
      isError: false,
      msg: null,
    },
    [typesRequestErrors.getRequestAllTicketsHelp]: {
      isError: false,
      msg: null,
    },
  },
};

export const dashboardHelpReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.helpCenterDashboardData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.helpCenterDashboardRequestAllTickets:
      return {
        ...state,
        requestInquiryAll: action.payload.tickets,
      };
    case types.helpCenterErrors:
      return dashboardHelpErrorReducer(state, action);
    case types.helpCenterDashboardReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const dashboardHelpErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getDashboardHelp:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getDashboardHelp]:
            action.payload[typesRequestErrors.getDashboardHelp],
        },
      };
    case typesRequestErrors.getRequestAllTicketsHelp:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getRequestAllTicketsHelp]:
            action.payload[typesRequestErrors.getRequestAllTicketsHelp],
        },
      };
    default:
      return state;
  }
};
