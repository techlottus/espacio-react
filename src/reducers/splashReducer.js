import { types } from "../types/types";

const initialState = {
  isShow: false,
};

export const splashReducer = (state = initialState, action = {}) => {
  if (action.type === types.splashShow) {
    return {
      ...state,
      isShow: action.payload.isShow,
    };
  } else {
    return state;
  }
};
