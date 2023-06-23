import { types } from "../../../types/types";


export const setErrorDashboardHelp = (typeError, isError, msg) => {
  return {
    type: types.helpCenterDashboardError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg,
      },
    },
  };
};

export const setDashboardHelpData = (data) => {
  return {
    type: types.helpCenterDashboardData, 
    payload: {
      data: [...data]
    }
  }

}

export const setDashboardHelpRequestAllTcikets = (tickets) => {
  return {
    type: types.helpCenterDashboardRequestAllTickets, 
    payload: {
      tickets
    }
  }

}

export const setResetDashboardHelp = () => {
  return {
    type: types.helpCenterDashboardReset, 
    payload: {}
  }
}


