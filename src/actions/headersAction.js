import { types } from "../types/types";


export const setAuth = (authorization) => {
  return {
    type: types.headersSetAuth,
    payload: {
      authorization
    }
  }

}