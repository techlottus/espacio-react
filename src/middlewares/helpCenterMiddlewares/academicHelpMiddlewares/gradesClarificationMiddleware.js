import { setAcademicHelpInformation, setAdsAcademicHelp } from "../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";
import { setLoading } from "../../../actions/loadingAction";
import { resetFlowProcedures } from "../../../helpers/proceduresActions";
import {
  getGradesClarificationHttp,
  postGradesClarificationHttp,
} from "../../../services/helpCenter/academicHelpServices/gradesClarificationService";

export const getGradesClarificationService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getGradesClarificationHttp()
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

export const postGradesClarificationService = (
  data,
  recordId,
  file,
  history
) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postGradesClarificationHttp(data, recordId, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push(
          "/help-center/flow/academic-help/grades-clarification/confirm",
          {
            status: res.ticketNumber,
            error: false,
            errorMessage: null,
          }
        );
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push(
          "/help-center/flow/academic-help/grades-clarification/confirm",
          {
            status: null,
            error: true,
            errorMessage: message,
          }
        );
      });
  };
};
