import { getValuesOfAuth } from "../../helpers/auth";
import { setReinstatementInformation } from "../../actions/proceduresActions/reinstatementAction";
import { postReinstatementHttp } from "../../services/procedures/reinstatementService";
import { setLoading } from "../../actions/loadingAction";
import { resetFlowProcedures } from "../../helpers/proceduresActions";

export const getReinstatementService = () => {
  return (dispatch) => {
    dispatch(
      setReinstatementInformation({
        phone: getValuesOfAuth().phone,
      })
    );
  };
};

export const postReinstatementService = (info, file, history, type) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postReinstatementHttp(info, file)
      .then((id) => {
        dispatch(setLoading(false));
        history.push("/procedures-main", {
          status: id,
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
