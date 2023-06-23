import { setDashboardHelpData, setErrorDashboardHelp } from "../../../actions/helpCenterActions/dashboardHelpActions/dashboardHelpActions";
import { setLoading } from "../../../actions/loadingAction";
import { typesRequestErrors } from "../../../constants/error.constant";
import { getDashboardHelpHttp } from "../../../services/helpCenter/dashboardHelpService/dashboardHelpService";
import { store } from "../../../store/store";

export const getDashboardHelpService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getDashboardHelpHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setErrorDashboardHelp(typesRequestErrors.getDashboardHelp ,false,null));
        dispatch(setDashboardHelpData(res));
      })
      .catch(() => {
        dispatch(setLoading(false));
        const { texts } = store.getState().texts;
        const message = texts?.procedures?.getRequestCostsError;
        dispatch(setErrorDashboardHelp(typesRequestErrors.getDashboardHelp ,true,message));
      });
  };
};
