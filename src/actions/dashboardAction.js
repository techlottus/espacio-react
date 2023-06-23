import { types } from "../types/types";
import { getDashboard } from "../services/dashboard/dashboardService"


export const getDataService = () => {
  return (dispatch) => {

    getDashboard()
    .then(res => {
      dispatch(setData(res))
    })
    .catch(err => {
        console.log(err)
    })
  }
}

export const setData = (data) => {
  return {
    type: types.dashboardGetData, 
    payload: {
      data
    }
  }

}

export const setLoadingDashboard = (loading) => {
  return {
    type: types.dashboardLoading, 
    payload: {
      loading
    }
  }

}

export const setErrorDashboard = (typeError,isError,msg) => {
  return {
    type: types.dashboardErrors,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg
      }
    }
  }
}