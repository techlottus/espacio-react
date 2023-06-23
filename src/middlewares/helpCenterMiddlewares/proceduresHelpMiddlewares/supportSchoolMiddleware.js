import { setProceduresHelpInformation } from "../../../actions/helpCenterActions/proceduresHelpActions/proceduresHelpActions";
import { setLoading } from "../../../actions/loadingAction";
import { resetFlowProcedures } from "../../../helpers/proceduresActions";
import { getSupportSchoolHttp, postSupportSchoolHttp } from "../../../services/helpCenter/proceduresHelpServices/supportSchoolService";

export const getSupportSchoolService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getSupportSchoolHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setProceduresHelpInformation({
            value: res.value,
          })
        );
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });
  };
};

export const postSupportSchoolService = (data, recordId, file, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postSupportSchoolHttp(data, recordId, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/help-center/flow/procedures-help/support-school-service/confirm", {
            status: res.ticketNumber,
            error: false,
            errorMessage: null,
          });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push(
          "/help-center/flow/procedures-help/support-school-service/confirm",
          {
            status: null,
            error: true,
            errorMessage: message,
          }
        );
      });
  };
};
