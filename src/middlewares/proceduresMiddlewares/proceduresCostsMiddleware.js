import { setLoading } from "../../actions/loadingAction";
import {
  setAllProcedures,
  setErrorPocedures,
} from "../../actions/proceduresActions/proceduresAction";
import { typesRequestErrors } from "../../constants/error.constant";
import { getProceduresCostsHttp } from "../../services/procedures/proceduresCostsService";
import { store } from "../../store/store";
import { getDegreeProcedureService } from "./degreeMiddleware";
import { getSocialServiceProcedureService } from "./socialServiceMiddleware";

export const getProceduresCostsService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(getDegreeProcedureService())
    dispatch(getSocialServiceProcedureService())
    getProceduresCostsHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(
          setErrorPocedures(typesRequestErrors.getCostsProcedures, false, null)
        );
        dispatch(setAllProcedures(res?.formality1, res?.formality2));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        const { texts } = store.getState().texts;
        const message = texts?.procedures?.getRequestCostsError;
        dispatch(
          setErrorPocedures(
            typesRequestErrors.getCostsProcedures,
            true,
            message
          )
        );
      });
  };
};
