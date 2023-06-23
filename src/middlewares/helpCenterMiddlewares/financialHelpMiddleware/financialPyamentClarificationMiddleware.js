import { setLoading } from "../../../actions/loadingAction";
import { resetFlowProcedures } from "../../../helpers/proceduresActions";
import {
  getPaymentClarificationHttp,
  postPaymentClarificationHttp,
} from "../../../services/helpCenter/financialHelpServices/helpClarificationService";
import { setAdsFinancialHelp, setFinancialHelpInformation } from "../../../actions/helpCenterActions/financialHelpActions/financialHelpAction";

export const getPaymentClarificationService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getPaymentClarificationHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setFinancialHelpInformation({
            optionsCheckboxes: res?.optionsCheckboxes,
            recordTypeId: res?.recordTypeId,
          })
        );
        if(res?.optionsAds) dispatch(setAdsFinancialHelp(res.optionsAds));
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });
  };
};

export const postPaymentClarificationService = (
  data,
  recordId,
  file,
  history
) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postPaymentClarificationHttp(data, recordId, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push(
          "/help-center/flow/financial-help/payment-clarification/confirm",
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
          "/help-center/flow/financial-help/payment-clarification/confirm",
          {
            status: null,
            error: true,
            errorMessage: message,
          }
        );
      });
  };
};
