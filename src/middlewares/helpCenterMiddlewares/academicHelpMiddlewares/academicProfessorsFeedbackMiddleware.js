import { setLoading } from "../../../actions/loadingAction";
import { resetFlowProcedures } from "../../../helpers/proceduresActions";
import {
  getAcademicProfessorsFeedbackHelpHttp,
  postAcademicProfessorsFeedbackHttp,
} from "../../../services/helpCenter/academicHelpServices/academicProfessorsFeedbackService";
import { setAcademicHelpInformation, setAdsAcademicHelp } from "../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";

export const getProfessorsFeedbackService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getAcademicProfessorsFeedbackHelpHttp()
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

export const postProfessorsFeedbackService = (data, recordId, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postAcademicProfessorsFeedbackHttp(data, recordId)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/help-center/flow/academic-help/professors-feedback/confirm", {
          status: res.ticketNumber,
          error: false,
          errorMessage: null,
        });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push("/help-center/flow/academic-help/professors-feedback/confirm", {
          status: null,
          error: true,
          errorMessage: message,
        });
      });
  };
};
