import { setLoading } from "../../actions/loadingAction";
import {
  setDataSocialServiceProcedures,
  setErrorSocialServiceProcedures,
  setSocialServiceInformation,
} from "../../actions/proceduresActions/socialServiceAction";
import { typesRequestErrors } from "../../constants/error.constant";
import { getValuesOfAuth } from "../../helpers/auth";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import {
  getSocialServiceProceduredHttp,
  postSocialServiceHttp,
} from "../../services/procedures/socialService";

export const getSocialServiceProcedureService = () => {
  return (dispatch) => {
    getSocialServiceProceduredHttp()
      .then((data) => {
        dispatch(
          setSocialServiceInformation({
            phone: getValuesOfAuth().phone,
          })
        );
        dispatch(
          setErrorSocialServiceProcedures(
            typesRequestErrors.getSocialServiceProcedureService,
            false,
            null
          )
        );
        dispatch(setDataSocialServiceProcedures(data));
      })
      .catch((err) => {
        dispatch(
          setErrorSocialServiceProcedures(
            typesRequestErrors.getSocialServiceProcedureService,
            true,
            ""
          )
        );
      });
  };
};

export const postSocialServiceProcedureService = (
  info,
  file,
  history,
  type,
  typeId
) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postSocialServiceHttp(info, file, typeId)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/procedures-main", {
          status: res.ticketNumber,
          id: res.transactionNumber,
          isPayment: true,
          type,
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
