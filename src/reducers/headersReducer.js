import env from "../enviroment/environment";
import { types } from "../types/types";

const initialState = {
  authorization: null,
  idBanner: null,
  countretry: 0,
  "Ocp-Apim-Subscription-Key":
    env.headerId || "a592492512254ef78eada2516d4a204b",
};

export const headersReducer = (state = initialState, action = {}) => {
  if (action.type === types.headersSetAuth) {
    return {
      ...state,
      authorization: action.payload.authorization,
    };
  } else {
    return state;
  }
};
