import { types } from "../types/types";

const initialState = {
  isShow: false,
};

export const loadingReducer = (state = initialState, action = {}) => {
  if (action.type === types.loadingShow) {
    return {
      ...state,
      isShow: action.payload.isShow,
    };
  } else {
    return state;
  }
};
