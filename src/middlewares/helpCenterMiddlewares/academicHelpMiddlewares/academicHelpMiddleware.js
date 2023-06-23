import { setAcademicHelpFaqs, setAcademicHelpRecordType, setAcademicHelpTickets, setAdsAcademicHelp, setErrorsAcademicHelp } from "../../../actions/helpCenterActions/academicHelpActions/academicHelpAction";
import { setLoading } from "../../../actions/loadingAction";
import { typesRequestErrors } from "../../../constants/error.constant";
import { getAcademicHelpHttp } from "../../../services/helpCenter/academicHelpServices/academicHelpService";


export const getAcademicHelpService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getAcademicHelpHttp()
    .then((res) => {
      dispatch(setErrorsAcademicHelp(typesRequestErrors.getAcademicCheckboxes,false,''))
      dispatch(setLoading(false));
      dispatch(setAcademicHelpTickets(res.tickets));
      dispatch(setAcademicHelpRecordType(res.recordType));
      dispatch(setAcademicHelpFaqs(res.faqs));
      dispatch(setAdsAcademicHelp(res.optionsAdes))
    })
    .catch((e) => {
      dispatch(setLoading(false));
        dispatch(setErrorsAcademicHelp(typesRequestErrors.getAcademicCheckboxes,true,''))
    })
  }
}