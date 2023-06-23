import { setLoading } from "../../actions/loadingAction";
import { getValuesOfAuth } from "../../helpers/auth";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { setCredentialInformation } from "../../actions/proceduresActions/credentialAction";
import {
  getCredentialHttp,
  postCredentialHttp,
} from "../../services/procedures/credentialService";

export const getCredentialService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getCredentialHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setCredentialInformation({
            phone: getValuesOfAuth().phone,
            optionsTypeCredential: res?.optionsCredentialType,
            optionsCredentialRequest: res?.optionsCredentialRequestType,
            optionsCampusDelivery: res?.optionsCampus,
          })
        );
      })
      .catch((e) => {
        dispatch(setLoading(false));
      });
  };
};

export const postCredentialService = (info, file, history) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postCredentialHttp(info, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/procedures-main", {
          status: res.ticketNumber,
          id: res.transactionNumber,
          error: false,
          errorMessage: null,
        });
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        history.push("/procedures-main", {
          status: null,
          error: true,
          errorMessage: message,
        });
      });
  };
};
