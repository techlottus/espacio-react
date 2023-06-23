import { typesRequestErrors } from "../constants/error.constant";
import { types } from "../types/types";

const initialState = {
  data: {},
  name: "Sofia",
  enrollment: "3456789567",
  loading: false,
  errors: {
    [typesRequestErrors.getDashboard]: {
      isError: false,
      msg: null,
    },
  },
};

export const dashboardReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.dashboardGetData:
      return {
        ...state,
        data: action.payload.data,
      };

    case types.dashboardErrors:
      return dashboardTypesErrorsReducer(state, action);

    case types.dashboardLoading:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
};

const dashboardTypesErrorsReducer = (state, action) => {
  if (action.typeError === typesRequestErrors.getDashboard) {
    return {
      ...state,
      errors: {
        ...state.errors,
        [typesRequestErrors.getDashboard]:
          action.payload[typesRequestErrors.getDashboard],
      },
    };
  } else {
    return state;
  }
};