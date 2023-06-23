import { types } from "../../types/types";

const initialState = {
  information: {
    phone: null,
  },
  data: {
    comments: null,
    phone: null,
  },
};

export const programChangeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureProgramChangeInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureProgramChangeData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.procedureProgramChangeReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
