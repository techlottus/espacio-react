import { types } from "../types/types";


export const setLoading = (isShow) => {
  return {
    type: types.loadingShow,
    payload: {
      isShow
    }
  }

}