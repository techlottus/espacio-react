import { setLoading } from "../../../actions/loadingAction";
import { resetFlowProcedures } from "../../../helpers/proceduresActions";
import { getDoubtsOnlineClassesHttp, postDoubtsOnlineClassesHttp } from "../../../services/helpCenter/academicHelpServices/doubtsOnlineClassesService";
import { setAcademicHelpInformation, setAdsAcademicHelp } from "../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";

export const getDoubtsOnlineClassesService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getDoubtsOnlineClassesHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setAcademicHelpInformation({
            optionsCheckboxes: res?.optionsCheckboxes,
            recordTypeId: res?.recordTypeId
          })
        );
        if(res?.optionsAds) dispatch(setAdsAcademicHelp(res.optionsAds));
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });
  };
};

export const postDoubtsOnlineClassesService = (data, recordId, file, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postDoubtsOnlineClassesHttp(data, recordId, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/help-center/flow/academic-help/doubts-classes-online/confirm", {
          status: res.ticketNumber,
          error: false,
          errorMessage: null,
        });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push("/help-center/flow/academic-help/doubts-classes-online/confirm", {
          status: null,
          error: true,
          errorMessage: message,
        });
      });
  };
};

