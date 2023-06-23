import { setProceduresHelpInformation } from "../../../actions/helpCenterActions/proceduresHelpActions/proceduresHelpActions";
import { setLoading } from "../../../actions/loadingAction";
import { getOtherAreasHelpHttp, postOtherAreasHttp } from "../../../services/helpCenter/proceduresHelpServices/otherAreasService";

export const getOtherAreasService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getOtherAreasHelpHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setProceduresHelpInformation({
            optionsCheckboxes: res.optionsCheckboxes,
            value: res.value,
          })
        );
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });
  };
}

export const postOtherAreasService = (data, recordId, file, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    postOtherAreasHttp(data, recordId, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/help-center/flow/procedures-help/other-areas-help-solicitude/confirm", {
            status: res.ticketNumber,
            error: false,
            errorMessage: null,
          });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push(
          "/help-center/flow/procedures-help/other-areas-help-solicitude/confirm",
          {
            status: null,
            error: true,
            errorMessage: message,
          }
        );
      });
  };
};
