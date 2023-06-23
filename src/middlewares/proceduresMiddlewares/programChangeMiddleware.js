import { getValuesOfAuth } from "../../helpers/auth";
import { setLoading } from "../../actions/loadingAction";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { setProgramChangeInformation } from "../../actions/proceduresActions/programChangeAction";
import { postProgramChangeHttp } from "../../services/procedures/programChangeService";

export const getProgramChangeService = () => {
  return (dispatch) => {
    dispatch(
      setProgramChangeInformation({
        phone: getValuesOfAuth().phone,
      })
    );
  };
};

export const postProgramChangeService = (info, file, history, type) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postProgramChangeHttp(info, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/procedures-main", {
          status: res.ticketNumber,
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
