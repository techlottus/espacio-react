import { types } from "../../types/types";
const initialState = {
  optionDesk: null,
  optionMobile: null
};
export const calendarReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.procedureCalendarSetOption:
      return {
        ...state,
        optionDesk: action.payload.optionDesk,
        optionMobile: action.payload.optionMobile 
      };
    default:
      return state;
  }
};