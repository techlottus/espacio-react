import { setAdsFinancialHelp, setErrorsFinancialHelp, setFinancialHelpFaqs, setFinancialHelpRecordType, setFinancialHelpTickets } from "../../../actions/helpCenterActions/financialHelpActions/financialHelpAction";
import { setLoading } from "../../../actions/loadingAction";
import { typesRequestErrors } from "../../../constants/error.constant";
import { getFinancialHelpHttp } from "../../../services/helpCenter/financialHelpServices/financialHelpService";

export const getFinancialHelpService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getFinancialHelpHttp()
    .then((res) => {
      dispatch(setErrorsFinancialHelp(typesRequestErrors.getFinancialCheckboxes,false,''))
      dispatch(setLoading(false));
      dispatch(setFinancialHelpTickets(res.tickets));
      dispatch(setFinancialHelpRecordType(res.recordType));
      dispatch(setFinancialHelpFaqs(res.faqs));
      dispatch(setAdsFinancialHelp(res.optionsAdes))
    })
    .catch((e) => {
      dispatch(setLoading(false));
        const { message } = e;
        dispatch(setErrorsFinancialHelp(typesRequestErrors.getFinancialCheckboxes,true,message))
    })
  }
}