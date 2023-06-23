import { setLoading } from "../../actions/loadingAction";
import { setCertificateStudyInformation } from "../../actions/proceduresActions/certificateStudiesAction";
import {
  getCertificateStudyHttp,
  postCertificateStudyHttp,
} from "../../services/procedures/certificateStudyService";
import { getValuesOfAuth } from "../../helpers/auth";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { typesRequestErrors } from "../../constants/error.constant";
import { setErrorPocedures } from "../../actions/proceduresActions/proceduresAction";

export const getCertificateStudyService = (history) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getCertificateStudyHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setCertificateStudyInformation({
            phone: getValuesOfAuth().phone,
            optionsTypeCertificate: res?.optionsCertificateType,
            optionsCertificateRequest: res?.optionsCertificatTotalType,
            optionsTypeDelivery: res?.optionsTypeDelivery,
            optionsCampusDelivery: res?.optionsCampus,
          })
        );
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        dispatch(setErrorPocedures(typesRequestErrors.getInformationProcedures, true, message));
      });
  };
};

export const postCertificateStudyService = (info, file, history,type, detailId) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postCertificateStudyHttp(info, file, detailId)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/procedures-main", {
          status: res.ticketNumber,
          id: res.transactionNumber,
          isPayment: true,
          error: false,
          type,
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
