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

export const reinstatementReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureReinstatementInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureReinstatementData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.procedureReinstatementReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
