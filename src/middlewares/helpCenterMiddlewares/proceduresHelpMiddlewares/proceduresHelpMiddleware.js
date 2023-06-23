import { setErrorsProceduresHelp, setProceduresHelpFaqs, setProceduresHelpRecordType, setProceduresHelpRecordTypeId, setProceduresHelpTickets } from "../../../actions/helpCenterActions/proceduresHelpActions/proceduresHelpActions";
import { setLoading } from "../../../actions/loadingAction";
import { typesRequestErrors } from "../../../constants/error.constant";
import { getProceduresHelpHttp } from "../../../services/helpCenter/proceduresHelpServices/proceduresHelpService";

export const getProceduresHelpService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getProceduresHelpHttp()
    .then((res) => {
      dispatch(setErrorsProceduresHelp(typesRequestErrors.getProceduresCheckboxes,false,''))
      dispatch(setLoading(false));
      dispatch(setProceduresHelpTickets(res.tickets));
      dispatch(setProceduresHelpRecordType(res.recordType[0].issues));
      dispatch(setProceduresHelpRecordTypeId(res.recordTypeId))
      dispatch(setProceduresHelpFaqs(res.faqs));
    })
    .catch((e) => {
      dispatch(setLoading(false));
        const { message } = e;
        dispatch(setErrorsProceduresHelp(typesRequestErrors.getProceduresCheckboxes,true,message))
    })
  }
}
