import { setErrorHelpCenter, setFaqsHelpSearch } from "../../../actions/helpCenterActions/faqsHelpActions/faqsHelpActions";
import { setLoading } from "../../../actions/loadingAction";
import { typesRequestErrors } from "../../../constants/error.constant";
import { postSearchHelpCenterHttp } from "../../../services/helpCenter/searchHelpCenterService/searchHelpCenterService";


export const postSearchHelpCenterService = (phrase) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    postSearchHelpCenterHttp(phrase)
      .then((res) => {
        dispatch(setErrorHelpCenter(typesRequestErrors.getSearchHelp,false,null))
        dispatch(setLoading(false));
        dispatch(setFaqsHelpSearch(res.tickets,res.faqs))
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(setErrorHelpCenter(typesRequestErrors.getSearchHelp,true,''))
      });
  };
};