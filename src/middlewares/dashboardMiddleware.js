import { getDashboard } from "../services/dashboard/dashboardService"
import { setData, setErrorDashboard, setLoadingDashboard } from "../actions/dashboardAction"
import { typesRequestErrors } from "../constants/error.constant"
import { originFromLogin } from "../helpers/actionsHistory";
import { setSplash } from "../actions/splashAction";


export const getDataService = (history) => {
  return (dispatch) => {
    const isLogin = originFromLogin(history);
    if(isLogin) {
      dispatch(setSplash(true))
    } else {
      dispatch(setLoadingDashboard(true))
    }

    getDashboard()
    .then(res => {
      if(isLogin) {
        setTimeout(() => {
          dispatch(setSplash(false))
          dispatch(setErrorDashboard(typesRequestErrors.getDashboard,false,null))
          dispatch(setData(res))
        },2000)
      } else {
        dispatch(setErrorDashboard(typesRequestErrors.getDashboard,false,null))
        dispatch(setData(res))
      }
    })

    .catch(err => {
      const { message } = err;
      dispatch(setLoadingDashboard(true))
      dispatch(setSplash(false))
      dispatch(setErrorDashboard(typesRequestErrors.getDashboard,true,message))
    })
  }
  }
