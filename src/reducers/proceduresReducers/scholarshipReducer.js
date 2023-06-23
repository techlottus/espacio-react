import { types } from "../../types/types";

const initialState = {
  information: {
    phone: null,
    renovationTypes: null
  },
  data: {
    comments: null,
    phone: null,
  },
};

export const scholarshipReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureScholarshipInfo:
      return {
        ...state,
        information: action.payload.information,
      };
    case types.procedureScholarshipData:
      return {
        ...state,
        data: action.payload.data,
      };
    case types.procedureScholarshipRenovationType:
      return {
        ...state, 
        information: {...state.information, renovationTypes: action.payload.renovationTypes}
      }
    case types.procedureScholarshipReset:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
