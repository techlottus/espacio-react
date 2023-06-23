import { getValuesOfAuth } from "../../helpers/auth";
import { setLoading } from "../../actions/loadingAction";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { setAdmissionCertificateInformation } from "../../actions/proceduresActions/admissionCertificateAction";
import { postAdmissioncertificateHttp } from "../../services/procedures/admissionCertificateService";

export const getAdmissionCertificateService = () => {
  return (dispatch) => {
    dispatch(
      setAdmissionCertificateInformation({
        phone: getValuesOfAuth().phone,
      })
    );
  };
};

export const postAdmissionCertificateService = (info, file, history, type) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postAdmissioncertificateHttp(info, file)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/procedures-main", {
          status: res.ticketNumber,
          id: res.transactionNumber,
          isPayment: true,
          type,
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
