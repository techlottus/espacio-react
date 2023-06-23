import {
  setDataDegree,
  setDegreeInformationGraduate,
  setDegreeInformationOnline,
  setDegreeModalGraduate,
  setDegreeModalOnline,
} from "../../actions/proceduresActions/degreeAction";
import {
  getDegreeHttp,
  postDegreeHttp,
} from "../../services/procedures/degreeService";
import { setLoading } from "../../actions/loadingAction";
import { getValuesOfAuth } from "../../helpers/auth";
import { resetFlowProcedures } from "../../helpers/proceduresActions";
import { typesModalityBanner } from "../../types/typesProcedures";

export const getDegreeProcedureService = () => {
  return (dispatch) => {
    getDegreeHttp()
      .then((res) => {
        dispatch(setDataDegree(res.optionsDegree))
        dispatch(
          setDegreeInformationOnline({
            phone: getValuesOfAuth().phone,
            optionsTypeProgramDegree: res?.optionTypeOnlineProgram,
            optionsTypePaymentDegree: res?.optionTypeOnlinePayment,
            optionTypeTraditionalPayment: res?.optionTypeTraditionalPayment,
            filesLinks: res?.links,
          })
        );
        dispatch(
          setDegreeInformationGraduate({
            phone: getValuesOfAuth().phone,
            optionsTypeProgramDegree: res?.optionTypeGraduateProgram,
            optionsTypePaymentDegree: res?.optionTypeGraduatePayment,
            filesLinks: res?.links,
          })
        );
        dispatch(setDegreeModalOnline(res?.stepsDegreeOnlineRequirement));
        dispatch(setDegreeModalGraduate(res?.stepsDegreeGraduateRequirement));
      })
      .catch((e) => {
        console.log('error: ',e)
      });
  };
};

export const postDegreeService = (info, file, history, type, typeId) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    resetFlowProcedures(dispatch);
    postDegreeHttp(info, typeId, file)
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
