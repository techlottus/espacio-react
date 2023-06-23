import { setLoading } from "../actions/loadingAction";
import {
  setBenefitsCards,
  setErrorBenefits,
} from "../actions/benefitsActions";
import { typesRequestErrors } from "../constants/error.constant";
import { getBenefitsHttp } from "../services/benefitsService/benefitsService";

export const getBenefitsService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getBenefitsHttp()
      .then((res) => {
        dispatch(setErrorBenefits(typesRequestErrors.getBenefits, false, ""));
        dispatch(setLoading(false));
        dispatch(setBenefitsCards(res.benefitsCards));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        dispatch(setErrorBenefits(typesRequestErrors.getBenefits, true, message));
      });
  };
};
