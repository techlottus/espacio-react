import { setLoading } from "../../../actions/loadingAction";
import { resetFlowProcedures } from "../../../helpers/proceduresActions";
import {
  getExtensionRequestHttp,
  postExtensionRequestHttp,
} from "../../../services/helpCenter/academicHelpServices/extensionRequestService";
import { setAcademicHelpInformation, setAdsAcademicHelp } from "../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";

export const getExtensionRequestService = (history) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getExtensionRequestHttp()
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

export const postExtensionRequestService = (data, recordId, file, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postExtensionRequestHttp(data, recordId, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push(
          "/help-center/flow/academic-help/extension-request/confirm",
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
          "/help-center/flow/academic-help/extension-request/confirm",
          {
            status: null,
            error: true,
            errorMessage: message,
          }
        );
      });
  };
};
