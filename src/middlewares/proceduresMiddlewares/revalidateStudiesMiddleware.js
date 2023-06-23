import { setLoading } from "../../actions/loadingAction";
import { setRevalidateStudiesInformation } from "../../actions/proceduresActions/revalidateStudiesAction";
import { getValuesOfAuth } from "../../helpers/auth";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { postRevalidateStudiesHttp } from "../../services/procedures/revalidateStudyService";


export const getRevalidateStudiesService = () => {
  return (dispatch) => {
    dispatch(
      setRevalidateStudiesInformation({
        phone: getValuesOfAuth().phone,
      })
    );
  };
};

export const postRevalidateStudiesService = (info, file, history, type) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postRevalidateStudiesHttp(info, file)
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
