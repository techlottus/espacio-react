import { typeflowsProcedures } from "../constants/Procedures.constant";
import { store } from "../store/store";

export const unblockPayment = (path) => {
  const validPath = typeof path === "string" && !path.includes("/payment/");
  const selectConcept = store.getState().payment.selectConcept;
  const valid = selectConcept !== null && validPath;
  return valid;
};

export const unblockProcedures = (path, location) => {
  try {
    const validPath =
      typeof path === "string" && !path.includes("/procedures-flows/");
    let selectPhone;
    let valid = false;
    switch (location) {
      case typeflowsProcedures.certificateStudy:
        selectPhone =
          store.getState().procedureCertificateStudy?.information?.phone;
        valid = selectPhone !== null && validPath;
        break;
      case typeflowsProcedures.equivalenceStudy:
        selectPhone =
          store.getState().procedureEquivalenceStudies?.information?.phone;
        valid = selectPhone !== null && validPath;
        break;
      case typeflowsProcedures.reinstatement:
        selectPhone =
          store.getState().proceduresReinstatement?.information?.phone;
        valid = selectPhone !== null && validPath;
        break;
      case typeflowsProcedures.academyHistory:
        selectPhone =
          store.getState().proceduresAcademicHistory?.information?.phone;
        valid = selectPhone !== null && validPath;
        break;
      case typeflowsProcedures.studyRecord:
        selectPhone = store.getState().procedureStudyRecord?.information?.phone;
        valid = selectPhone !== null && validPath;
        break;
      default:
        break;
    }
    return valid;
  } catch (error) {
    return false;
  }
};
