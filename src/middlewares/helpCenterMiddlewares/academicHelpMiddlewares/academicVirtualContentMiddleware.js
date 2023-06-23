import { setLoading } from "../../../actions/loadingAction";
import { resetFlowProcedures } from "../../../helpers/proceduresActions";
import {
  getAcademicVirtualContentHelpHttp,
  postAcademicVirtualContentHttp,
} from "../../../services/helpCenter/academicHelpServices/academicVirtualContentService";
import { setAcademicHelpInformation, setAdsAcademicHelp } from "../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";

export const getVirtualContentService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getAcademicVirtualContentHelpHttp()
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

export const postVirtualContentService = (data, recordId, file, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postAcademicVirtualContentHttp(data, recordId, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/help-center/flow/academic-help/virtual-content-help/confirm", {
          status: res.ticketNumber,
          error: false,
          errorMessage: null,
        });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push("/help-center/flow/academic-help/virtual-content-help/confirm", {
          status: null,
          error: true,
          errorMessage: message,
        });
      });
  };
};
