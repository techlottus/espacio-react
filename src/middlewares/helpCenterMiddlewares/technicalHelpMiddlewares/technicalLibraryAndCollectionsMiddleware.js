import { setAdsTechnicalHelp } from "../../../actions/helpCenterActions/technicalHelpActions/technicalHelpActions";
import { setTechnicalLibraryAndCollectionsInformation } from "../../../actions/helpCenterActions/technicalHelpActions/technicalLibraryAndCollectionsAction";
import { setLoading } from "../../../actions/loadingAction";
import { getTechnicalLibraryAndAColectionsHttp, postTechnicalLibraryAndAColectionsHttp } from "../../../services/helpCenter/technicalHelpServices/technicalLibraryAndCollectionsService";


export const getTechnicalLibraryAndCollectionsService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getTechnicalLibraryAndAColectionsHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setTechnicalLibraryAndCollectionsInformation({
            optionsCheckboxes: res?.optionsCheckboxes,
            recordTypeId: res?.recordTypeId
          })
        );
        if(res?.optionsAds) dispatch(setAdsTechnicalHelp(res.optionsAds));
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });
  };
};

export const postTechnicalLibraryAndCollectionsService = (data,recordId,file,history) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    postTechnicalLibraryAndAColectionsHttp(data,recordId,file)
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setLoading(false));
        history.push("/help-center/flow/technical-help/library-and-collections/confirm", {
          status: res.ticketNumber,
          error: false,
          errorMessage: null,
        });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push("/help-center/flow/technical-help/library-and-collections/confirm", {
          status: null,
          error: true,
          errorMessage: message,
        });
      });
  };
};