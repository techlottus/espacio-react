import { setAcademicHistoryInformation } from "../../actions/proceduresActions/academicHistoryAction";
import {
  getAcademicHistoryHttp,
  postAcademicHistoryHttp,
} from "../../services/procedures/academicHistoyService";
import { setLoading } from "../../actions/loadingAction";
import { getValuesOfAuth } from "../../helpers/auth";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { typesRequestErrors } from "../../constants/error.constant";
import { setErrorPocedures } from "../../actions/proceduresActions/proceduresAction";

export const getAcademicHistoryService = (history) => {
  return (dispatch) => {
    dispatch(setLoading(true));

   getAcademicHistoryHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setAcademicHistoryInformation({
            phone: getValuesOfAuth().phone,
            optionsCampusDelivery: res?.optionsCampusDelivery,
            optionsTypeDelivery: res?.optionsTypeDelivery,
          })
        );
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        dispatch(setErrorPocedures(typesRequestErrors.getInformationProcedures, true, message));
      });
  };
};

export const postAcademicHistoryService = (info, file, history, type) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postAcademicHistoryHttp(info, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/procedures-main", {
          status: res.ticketNumber,
          id: res.transactionNumber,
          type,
          isPayment: true,
          error: false,
          errorMessage: null,
        });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push("/procedures-main", {
          status: null,
          error: true,
          errorMessage: message,
        });
      });
  };
};
