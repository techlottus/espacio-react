import { getValuesOfAuth } from "../../helpers/auth";
import { setLoading } from "../../actions/loadingAction";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { getScholarshipRenovationType, postScholarshipHttp } from "../../services/procedures/scholarshipService";
import { setScholarshipInformation, setScholarshipRenovationType } from "../../actions/proceduresActions/scholarshipAction";

export const getScholarshipService = () => {
  return (dispatch) => {
    dispatch(
      setScholarshipInformation({
        phone: getValuesOfAuth().phone,
      })
    );
  };
};

export const postScholarshipService = (info, file, history, type) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postScholarshipHttp(info, file)
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

export const getScholarshipRenovationTypesService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getScholarshipRenovationType().then((data) => {
      dispatch(setLoading(false))
      dispatch(setScholarshipRenovationType(data.renovationTypes))
    })
    .catch((e) => {
      console.log(e);
      dispatch(setLoading(false))
    })
  };
};