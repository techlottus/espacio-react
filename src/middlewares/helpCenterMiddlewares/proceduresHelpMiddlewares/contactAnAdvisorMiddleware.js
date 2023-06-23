import { setProceduresHelpInformation } from "../../../actions/helpCenterActions/proceduresHelpActions/proceduresHelpActions";
import { setLoading } from "../../../actions/loadingAction";
import { resetFlowProcedures } from "../../../helpers/proceduresActions";
import { getContactAnAdvisorHttp, postContactAnAdvisorHttp } from "../../../services/helpCenter/proceduresHelpServices/contactAnAdvisorService";

export const getContactAnAdvisorService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getContactAnAdvisorHttp()
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

export const postContactAnAdvisorService = (data, recordId, file, history, value) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postContactAnAdvisorHttp(data, recordId, file, value)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/help-center/flow/procedures-help/contact-advisor/confirm", {
            status: res.ticketNumber,
            error: false,
            errorMessage: null,
          });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push(
          "/help-center/flow/procedures-help/contact-advisor/confirm",
          {
            status: null,
            error: true,
            errorMessage: message,
          }
        );
      });
  };
};
