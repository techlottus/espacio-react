import { setLoading } from "../../../actions/loadingAction";
import { resetFlowProcedures } from "../../../helpers/proceduresActions";
import {
  getAcademicActivitiesHelpHttp,
  postAcademicActivitiesHttp,
} from "../../../services/helpCenter/academicHelpServices/academicActivitiesService";
import { setAcademicHelpInformation, setAdsAcademicHelp } from "../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";

export const getAcademicActivitiesService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getAcademicActivitiesHelpHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setAcademicHelpInformation({
            optionsCheckboxes: res?.optionsCheckboxes,
            recordTypeId: res?.recordTypeId,
          })
        );
        if(res?.optionsAds) dispatch(setAdsAcademicHelp(res.optionsAds));
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });
  };
};

export const postAcademicActivitiesService = (
  data,
  recordId,
  file,
  history
) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postAcademicActivitiesHttp(data, recordId, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/help-center/flow/academic-help/activities-help/confirm", {
          status: res.ticketNumber,
          error: false,
          errorMessage: null,
        });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push("/help-center/flow/academic-help/activities-help/confirm", {
          status: null,
          error: true,
          errorMessage: message,
        });
      });
  };
};
