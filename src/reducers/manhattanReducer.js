import { typesRequestErrors } from "../constants/error.constant";
import { types } from "../types/types";

const initialState = {
  reload: false,
  data: {},
  errors: {},
};

export const manhattanReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.manhattanSetData:
      return {
        ...state,
        data: {
          ...action.payload,
        },
      };
    case types.manhattanReload:
      return {
        ...state,
        reload: action.payload.reload,
      };

    default:
      return state;
  }
};
