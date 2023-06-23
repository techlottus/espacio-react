import { typesRequestErrors } from "../../../constants/error.constant";
import { types } from "../../../types/types";

const initialState = {
  data: null,
  optionCoordinators: [],
  optionAdvisors: [],
  errors: {
    [typesRequestErrors.getDirectorydHelp]: {
      isError: false,
      msg: null,
    },
  },
};

export const directoryHelpReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.helpCenterDirectoryData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.helpCenterDirectoryCoordinators:
      return {
        ...state,
        optionCoordinators:
          action.payload.optionCoordinators,
      };
      case types.helpCenterDirectoryAdvisors:
      return {
        ...state,
        optionAdvisors:
          action.payload.optionAdvisors,
      };
    case types.helpCenterErrors:
      return directoryHelpErrorReducer(state, action);
    case types.helpCenterDirectoryReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const directoryHelpErrorReducer = (state, action) => {
  switch (action.typeError) {
    case typesRequestErrors.getDirectorydHelp:
      return {
        ...state,
        erros: {
          ...state.errors,
          [typesRequestErrors.getDirectorydHelp]:
            action.payload[typesRequestErrors.getDirectorydHelp],
        },
      };
    default:
      return state;
  }
};
