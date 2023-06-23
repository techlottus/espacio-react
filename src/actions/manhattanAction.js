import { types } from "../types/types";

export const setCourses = (data) => {
  return {
    type: types.manhattanSetData,
    payload: {
      ...data,
    },
  };
};

export const setReload = (status) => {
  return {
    type: types.manhattanReload,
    payload: {
      reload: status,
    },
  };
};
