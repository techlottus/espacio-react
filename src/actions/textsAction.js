import { types } from "../types/types";

export const setTextValues = (values) => {
  return {
    type: types.textsSetValues,
    payload: {
      ...values
    },
  };
};
