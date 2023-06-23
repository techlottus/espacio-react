import { types } from "../types/types";


export const setSplash = (isShow) => {
  return {
    type: types.splashShow,
    payload: {
      isShow
    }
  }

}