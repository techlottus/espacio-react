import { types } from "../types/types";

export const setTokens = (accessToken,refreshToken) => {
  return {
    type: types.loginSetTokens,
    payload: {
      accessToken,
      refreshToken
    }
  }

}