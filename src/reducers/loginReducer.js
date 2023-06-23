import { types } from "../types/types";

const initialState = {
  accessToken: null,
  refreshToken: null,
};

export const loginReducer = (state = initialState, action = {}) => {
  if (action.type === types.loginSetTokens) {
    return {
      ...state,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
    };
  } else {
    return state;
  }
};
