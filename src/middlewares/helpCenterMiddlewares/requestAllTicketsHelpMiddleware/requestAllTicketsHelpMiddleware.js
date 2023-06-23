import { setDashboardHelpRequestAllTcikets, setErrorDashboardHelp } from "../../../actions/helpCenterActions/dashboardHelpActions/dashboardHelpActions";
import { setErrorHelpCenter } from "../../../actions/helpCenterActions/faqsHelpActions/faqsHelpActions";
import { setLoading } from "../../../actions/loadingAction";
import { typesRequestErrors } from "../../../constants/error.constant";
import { getRequesAllTicketsHelpCenterHttp } from "../../../services/helpCenter/requestAllTicketsHelpService/requestAllTicketsHelpService";

export const getRequesAllTicketsHelpCenterService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getRequesAllTicketsHelpCenterHttp()
      .then((res) => {
        dispatch(setErrorDashboardHelp(typesRequestErrors.getRequestAllTicketsHelp,false,null))
        dispatch(setLoading(false));
        dispatch(setDashboardHelpRequestAllTcikets(res))
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(setErrorHelpCenter(typesRequestErrors.getRequestAllTicketsHelp,true,''))
      });
  };
};