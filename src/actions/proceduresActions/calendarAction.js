import { types } from "../../types/types";
export const setDataCalendar = (optionDesk, optionMobile) => {
    return {
      type: types.procedureCalendarSetOption,
      payload: {
        optionDesk: {
          ...optionDesk,
        },
        optionMobile: {
            ...optionMobile,
          }, 
      },
    };
  };