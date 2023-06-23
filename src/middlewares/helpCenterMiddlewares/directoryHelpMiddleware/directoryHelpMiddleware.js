import { setDirectoryAdvisorsHelp, setDirectoryCoordinatorsHelp, setDirectoryHelpData, setErrorDirectoryHelp } from "../../../actions/helpCenterActions/directoryActions/directoryActions";
import { setLoading } from "../../../actions/loadingAction";
import { typesRequestErrors } from "../../../constants/error.constant";
import { getDirectoryHelpHttp } from "../../../services/helpCenter/directoryService/directoryService";
import { store } from "../../../store/store";

export const getDirectoryHelpService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getDirectoryHelpHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setErrorDirectoryHelp(typesRequestErrors.getDirectorydHelp ,false,null));
        dispatch(setDirectoryHelpData(res));
        dispatch(setDirectoryCoordinatorsHelp(res?.optionCoordinators));
        dispatch(setDirectoryAdvisorsHelp(res?.optionAdvisors));
      })
      .catch(() => {
        dispatch(setLoading(false));
        const { texts } = store.getState().texts;
        const message = texts?.procedures?.getRequestCostsError;
        dispatch(setErrorDirectoryHelp(typesRequestErrors.getDirectorydHelp ,true,message));
      });
  };
};
