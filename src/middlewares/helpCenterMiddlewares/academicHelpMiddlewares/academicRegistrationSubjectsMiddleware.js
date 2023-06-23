import { setLoading } from "../../../actions/loadingAction";
import { getAcademicRegistrationSubjectsHttp, postAcademicRegistrationSubjectsHttp } from "../../../services/helpCenter/academicHelpServices/academicRegistrationSubjectsService";
import { setAcademicHelpInformation, setAdsAcademicHelp } from "../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";


export const getAcademicRegistrationSubjectsService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getAcademicRegistrationSubjectsHttp()
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

export const postAcademicRegistrationSubjectsService = (data,recordId,file,history) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    postAcademicRegistrationSubjectsHttp(data,recordId,file)
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setLoading(false));
        history.push("/help-center/flow/academic-help/registration-subjects/confirm", {
          status: res.ticketNumber,
          error: false,
          errorMessage: null,
        });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push("/help-center/flow/academic-help/registration-subjects/confirm", {
          status: null,
          error: true,
          errorMessage: message,
        });
      });
  };
};