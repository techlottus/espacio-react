import { setAccountMovements,setAccountProfile, setAccountStatusPrograms, setDebitPeriod, setErrorAccountStatus } from "../actions/accountStatusAction";
import { getAccountMovementsHttp,getAccountHttp, getAccountReportHttp, getDebitPeriodHttp, getProgramsdHttp } from "../services/accountStatus/accountStatusService";
import { setLoading } from "../actions/loadingAction";
import { getValuesOfAuth } from "../helpers/auth";
import { typesRequestErrors } from "../constants/error.constant";
import { notiObs } from "../observables/notificationObs";
import { typesNoti } from "../types/typeNoti";

export const getAllAccountsService = () => {
  return (dispatch) => {
    dispatch(setLoading(true))

    Promise.allSettled([getAccountHttp(),getDebitPeriodHttp(),getProgramsdHttp()])
    .then((result) => {
      dispatch(setLoading(false))
      if(result[0].status === 'fulfilled') {
        dispatch(setErrorAccountStatus(typesRequestErrors.getAccountStatus,false,null))
        dispatch(setAccountProfile(result[0].value))
      }
      else {
        const {message} = result[0].reason
        dispatch(setErrorAccountStatus(typesRequestErrors.getAccountStatus,true,message))
      }

      if(result[1].status === 'fulfilled') {
        dispatch(setErrorAccountStatus(typesRequestErrors.getAccountStatus,false,null))
        dispatch(setDebitPeriod(result[1].value))
      }
      else {
        const {message} = result[1].reason
        dispatch(setErrorAccountStatus(typesRequestErrors.getAccountStatus,true,message))
      }

      if(result[2].status === 'fulfilled') {
        dispatch(setErrorAccountStatus(typesRequestErrors.getProgramsAccountStatus,false,null))
        dispatch(setAccountStatusPrograms(result[2].value))
      }
      else {
        const {message} = result[2].reason
        dispatch(setErrorAccountStatus(typesRequestErrors.getProgramsAccountStatus,true,message))
      }
    })
  }
}


export const getAccountService = () => {
  return (dispatch) => {

    dispatch(setLoading(true))

    getAccountHttp()
      .then((res) => {
        dispatch(setLoading(false))
        dispatch(setAccountProfile(res))
      }) 
      .catch((err) => {
        dispatch(setLoading(false))
      });
  };
}

export const getAccountReportService = () => {
  return (dispatch) => {

    dispatch(setLoading(true))

    getAccountReportHttp()
      .then((data) => {
        dispatch(setLoading(false))
        const url = window.URL.createObjectURL(new Blob([data]));
        const {mask} = getValuesOfAuth();
        const link = document.createElement("a");
        link.href = url;
        const date = new Date()
        const dateFormat = `${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}`;
        const nameDocument = `EdoCuentaUTC_${mask}_${dateFormat}.pdf`
        link.setAttribute("download", nameDocument);
        document.body.appendChild(link);
        link.click();
        dispatch(setErrorAccountStatus(typesRequestErrors.getAccountStatus, false, null));
        notiObs.next({
          type: typesNoti.success,
          text: 'Descarga exitosa, visualiza los movimientos en tu estado de cuenta',
        })
      }) 
      .catch((err) => {
        const { message } = err;
        dispatch(setErrorAccountStatus(typesRequestErrors.getAccountStatus, true, message));
        dispatch(setLoading(false))
      });
  };
}

export const getDebitPeriodService = () => {
  return (dispatch) => {
    getDebitPeriodHttp()
      .then((res) => {
        dispatch(setLoading(false))
        dispatch(setDebitPeriod(res))
      }) 
      .catch(() => {
        dispatch(setLoading(false));
      })
  }
}

export const getProgramsService = () => {
  return (dispatch) => {
    getDebitPeriodHttp()
      .then((res) => {
        dispatch(setLoading(false))
        dispatch(setErrorAccountStatus(typesRequestErrors.getProgramsAccountStatus,false,null))
        dispatch(setDebitPeriod(res))
      }) 
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(setErrorAccountStatus(typesRequestErrors.getProgramsAccountStatus,true,message))
      })
  }
}

export const getMovementsService = (period, program) => {
  return (dispatch) => {
    getAccountMovementsHttp(period, program)
      .then((res) => {
        dispatch(setErrorAccountStatus(typesRequestErrors.getMovementsOfPeriosAccountAccountStatus, false, null));
        dispatch(setAccountMovements(res))
      }) 
      .catch((err) => {
        const { message } = err;
        dispatch(setErrorAccountStatus(typesRequestErrors.getMovementsOfPeriosAccountAccountStatus, true, message));
        dispatch(setLoading(false))
      });
  };
}