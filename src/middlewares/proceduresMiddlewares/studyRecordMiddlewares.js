import {
  setStudyRecordInformation,
  setStudyRecordModal,
} from "../../actions/proceduresActions/studyRecordAction";
import {
  getStudyRecordHttp,
  postStudyRecordHttp,
} from "../../services/procedures/studyRecordService";
import { setLoading } from "../../actions/loadingAction";
import { getValuesOfAuth } from "../../helpers/auth";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { setErrorPocedures } from "../../actions/proceduresActions/proceduresAction";
import { typesRequestErrors } from "../../constants/error.constant";

export const getStudyRecordService = (history) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getStudyRecordHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setStudyRecordInformation({
            phone: getValuesOfAuth().phone,
            optionsTypeRecord: res?.optionsTypeRecord,
            optionsTypeDelivery: res?.optionsTypeDelivery,
            optionsCampusDelivery: res?.optionsCampusDelivery,
          })
        );
        dispatch(setStudyRecordModal(res?.modal));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { message } = e;
        dispatch(setErrorPocedures(typesRequestErrors.getInformationProcedures, true, message));
      });
  };
};

export const postStudyRecordService = (info, file, history, type, detailId) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postStudyRecordHttp(info, file, detailId)
      .then((res) => {
        dispatch(setLoading(false));
        history.push("/procedures-main", {
          status: res.ticketNumber,
          id: res.transactionNumber,
          type,
          isPayment: true,
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
