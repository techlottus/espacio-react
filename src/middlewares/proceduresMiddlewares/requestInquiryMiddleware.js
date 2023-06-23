import { setLoading } from "../../actions/loadingAction";
import {
  setErrorPocedures,
  setRequestInquiryProcedures,
} from "../../actions/proceduresActions/proceduresAction";
import { typesRequestErrors } from "../../constants/error.constant";
import { getRequestInquiryHttp } from "../../services/procedures/requestInquiryServices";
import { store } from "../../store/store";

export const getRequestInquiryService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getRequestInquiryHttp()
      .then((request) => {
        dispatch(setLoading(false));
        dispatch(setRequestInquiryProcedures(request));
      })
      .catch(() => {
        const { texts } = store.getState().texts;
        const message = texts?.procedures?.getRequestInquiryError;
        dispatch(setLoading(false));
        dispatch(
          setErrorPocedures(
            typesRequestErrors.getRequestInquiryProcedures,
            true,
            message
          )
        );
      });
  };
};
