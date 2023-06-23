import { setErrorHelpCenter, setFaqsHelpData } from "../../../actions/helpCenterActions/faqsHelpActions/faqsHelpActions";
import { setLoading } from "../../../actions/loadingAction";
import { typesRequestErrors } from "../../../constants/error.constant";
import { getFaqsHelpHttp } from "../../../services/helpCenter/faqsHelpService/faqsHelpServices";
import { store } from "../../../store/store";

export const getFaqsHelpService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getFaqsHelpHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setErrorHelpCenter(typesRequestErrors.getFaqsHelp ,false,null));
        dispatch(setFaqsHelpData(res));
      })
      .catch(() => {
        dispatch(setLoading(false));
        const { texts } = store.getState().texts;
        const message = texts?.procedures?.getRequestCostsError;
        dispatch(setErrorHelpCenter(typesRequestErrors.getFaqsHelp ,true,message));
      });
  };
};
