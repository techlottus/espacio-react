import { setLoading } from "../../actions/loadingAction";
import { getValuesOfAuth } from "../../helpers/auth";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { setEquivalenceStudiesInformation } from "../../actions/proceduresActions/equivalenceStudiesAction";
import { postEquivalenceStudiesHttp } from "../../services/procedures/equivalenceStudiesService";

export const getEquivalenceStudiesService = () => {
  return (dispatch) => {
    dispatch(
      setEquivalenceStudiesInformation({
        phone: getValuesOfAuth().phone,
      })
    );
  };
};

export const postEquivalenceStudiesService = (info, file, history, type) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postEquivalenceStudiesHttp(info, file)
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
