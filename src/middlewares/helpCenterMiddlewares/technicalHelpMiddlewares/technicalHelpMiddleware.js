import { setAdsTechnicalHelp, setErrorsTechnicalHelp, setTechnicalHelpFaqs, setTechnicalHelpRecordType, setTechnicalHelpTickets } from "../../../actions/helpCenterActions/technicalHelpActions/technicalHelpActions";
import { setLoading } from "../../../actions/loadingAction";
import { typesRequestErrors } from "../../../constants/error.constant";
import { getTechnicalHelpHttp } from "../../../services/helpCenter/technicalHelpServices/technicalHelpService";

export const getTechnicalHelpService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getTechnicalHelpHttp()
    .then((res) => {
      dispatch(setErrorsTechnicalHelp(typesRequestErrors.getTechnicalCheckboxes,false,''))
      dispatch(setLoading(false));
      dispatch(setTechnicalHelpTickets(res.tickets));
      dispatch(setTechnicalHelpRecordType(res.recordType));
      dispatch(setTechnicalHelpFaqs(res.faqs));
      dispatch(setAdsTechnicalHelp(res.optionsAdes))
    })
    .catch((e) => {
      dispatch(setLoading(false));
        const { message } = e;
        dispatch(setErrorsTechnicalHelp(typesRequestErrors.getTechnicalCheckboxes,true,message))
    })
  }
}