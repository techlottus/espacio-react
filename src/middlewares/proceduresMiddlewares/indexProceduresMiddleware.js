import { typeflowsProcedures } from "../../constants/Procedures.constant";
import { store } from "../../store/store";
import { postAcademicHistoryService } from "./academicHistoryMiddleware";
import { postAdmissionCertificateService } from "./admissionCertificateMiddleware";
import { postCertificateStudyService } from "./certificateStudyMiddlewares";
import { postDegreeService } from "./degreeMiddleware";
import { postEquivalenceStudiesService } from "./equivalenceStudiesMiddleware";
import { postProgramChangeService } from "./programChangeMiddleware";
import { postReinstatementService } from "./reinstamentMiddleware";
import { postRevalidateStudiesService } from "./revalidateStudiesMiddleware";
import { postScholarshipService } from "./scholarshipMiddleware";
import { postSocialServiceProcedureService } from "./socialServiceMiddleware";
import { postStudyRecordService } from "./studyRecordMiddlewares";

export const proceduresRequest = (type, history, info, file, detailId) => {
  let typeId;
  return (dispatch) => {
    switch (type) {
      case typeflowsProcedures.studyRecord:
        dispatch(postStudyRecordService(info, file, history, type, detailId));
        break;
      case typeflowsProcedures.academyHistory:
        dispatch(postAcademicHistoryService(info, file, history, type));
        break;
      case typeflowsProcedures.certificateStudy:
        dispatch(
          postCertificateStudyService(info, file, history, type, detailId)
        );
        break;
      case typeflowsProcedures.equivalenceStudy:
        dispatch(postEquivalenceStudiesService(info, file, history, type));
        break;
      case typeflowsProcedures.reinstatement:
        dispatch(postReinstatementService(info, file, history, type));
        break;
      case typeflowsProcedures.elderOrIllSocialService:
        typeId = store.getState().proceduresSocialService?.socialTypeId;
        dispatch(
          postSocialServiceProcedureService(info, file, history, type, typeId)
        );
        break;
      case typeflowsProcedures.registerProgramorInstitute:
        typeId = store.getState().proceduresSocialService?.socialTypeId;
        dispatch(
          postSocialServiceProcedureService(info, file, history, type, typeId)
        );
        break;
      case typeflowsProcedures.ulaInstitutionSocialService:
        typeId = store.getState().proceduresSocialService?.socialTypeId;
        dispatch(
          postSocialServiceProcedureService(info, file, history, type, typeId)
        );
        break;
      case typeflowsProcedures.governmentEmployee:
        typeId = store.getState().proceduresSocialService?.socialTypeId;
        dispatch(
          postSocialServiceProcedureService(info, file, history, type, typeId)
        );
        break;
      case typeflowsProcedures.degreeInProgress:
        typeId = store.getState().proceduresDegree?.degreeTypeId;
        dispatch(postDegreeService(info, file, history, type, typeId));
        break;
      case typeflowsProcedures.degreeGraduate:
        typeId = store.getState().proceduresDegree?.degreeTypeId;
        dispatch(postDegreeService(info, file, history, type, typeId));
        break;
      case typeflowsProcedures.scholarship:
        dispatch(postScholarshipService(info, file, history, type));
        break;
      case typeflowsProcedures.revalidateStudy:
        dispatch(postRevalidateStudiesService(info, file, history, type));
        break;
      case typeflowsProcedures.admissionCertificate:
        dispatch(postAdmissionCertificateService(info, file, history, type));
        break;
      case typeflowsProcedures.programChange:
        dispatch(postProgramChangeService(info, file, history, type));
        break;
      default:
        break;
    }
  };
};
