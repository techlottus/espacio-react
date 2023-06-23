import { setAcademicHistoryReset } from "../actions/proceduresActions/academicHistoryAction";
import { setCertificateStudyReset } from "../actions/proceduresActions/certificateStudiesAction";
import { setCredentialReset } from "../actions/proceduresActions/credentialAction";
import { setDegreeReset } from "../actions/proceduresActions/degreeAction";
import { setEquivalenceStudiesReset } from "../actions/proceduresActions/equivalenceStudiesAction";
import { setReinstatementReset } from "../actions/proceduresActions/reinstatementAction";
import { setResetSocialServiceProcedures } from "../actions/proceduresActions/socialServiceAction";
import { setScholarshipReset } from "../actions/proceduresActions/scholarshipAction";
import { setStudyRecordReset } from "../actions/proceduresActions/studyRecordAction";
import {
  typeflowsProcedures,
  typeStagesProcedures,
} from "../constants/Procedures.constant";
import { setAdmissionCertificateReset } from "../actions/proceduresActions/admissionCertificateAction";
import { setProgramChangeReset } from "../actions/proceduresActions/programChangeAction";

export const actionConfigProcedure = (typeFlow, texts) => {
  switch (typeFlow) {
    case typeflowsProcedures.certificateStudy:
      return ['modal']
    case typeflowsProcedures.equivalenceStudy:
      return ['modal']
    case typeflowsProcedures.reinstatement:
      return ['download']
    case typeflowsProcedures.degreeInProgress:
      return ['modal']
    case typeflowsProcedures.degreeGraduate:
      return ['modal']
    case typeflowsProcedures.scholarship:
      return ['modal', 'download', 'feedback']
    case typeflowsProcedures.revalidateStudy:
      return ['download']
    case typeflowsProcedures.governmentEmployee:
      return ['download']
    case typeflowsProcedures.ulaInstitutionSocialService:
      return ['download']
    case typeflowsProcedures.registerProgramorInstitute:
      return ['download']
    case typeflowsProcedures.elderOrIllSocialService:
      return ['download']
    case typeflowsProcedures.admissionCertificate:
      return ['download', 'download']
    case typeflowsProcedures.programChange:
      return ['download']
    default:

     return []
  }
};

export const getTitleButtonInfo = (typeFlow, texts) => {
  switch (typeFlow) {
    case typeflowsProcedures.certificateStudy:
      return texts.procedures.btnInfoCertificateStudy;
    case typeflowsProcedures.equivalenceStudy:
      return texts.procedures.btnInfoEquivalenceStudy;
    case typeflowsProcedures.reinstatement:
      return texts.procedures.btnInfoReinstatement;
    case typeflowsProcedures.degreeInProgress:
      return texts.procedures.btnInfoDegree;
    case typeflowsProcedures.degreeGraduate:
      return texts.procedures.btnInfoDegree;
    case typeflowsProcedures.scholarship:
      return texts.procedures.btnInfoScholarship;
    default:
      return "";
  }
};

export const getTitleButtonInfoDownload = (typeFlow, texts) => {
  switch (typeFlow) {
    case typeflowsProcedures.scholarship:
      return texts.procedures.btnInfoScholarshipDownload;
    case typeflowsProcedures.admissionCertificate:
      return [texts.procedures.btnInfoAdmissionCertificate, texts.procedures.btnExampleAdmissionCertificate]
    case typeflowsProcedures.programChange:
      return texts.procedures.btnInfoProgramChange;
    case typeflowsProcedures.revalidateStudy:
      return texts.procedures.btnInfoRevalidate;
    case typeflowsProcedures.governmentEmployee:
      return texts.procedures.btnInfoSocialService;
    case typeflowsProcedures.ulaInstitutionSocialService:
      return texts.procedures.btnInfoSocialService;
    case typeflowsProcedures.registerProgramorInstitute:
      return texts.procedures.btnInfoSocialService;
    case typeflowsProcedures.elderOrIllSocialService:
      return texts.procedures.btnInfoSocialService;
    default:
      return "";
  }
};

export const getTitleInfoFeedback = (typeFlow, texts) => {
  switch (typeFlow) {
    case typeflowsProcedures.scholarship:
      return texts.procedures.feedbackInfoScholarship;
    default:
      return "";
  }
};

export const setConfigInfoProcedures = (
  type,
  setTexts,
  setBreadCrumb,
  breadCrumb,
  proceduresAll,
  texts
) => {
  let procedureSelect = {};
  switch (type.flow) {
    case typeflowsProcedures.governmentEmployee:
      procedureSelect = proceduresAll
        ? proceduresAll.filter(
            (e) => e.type === typeflowsProcedures.socialService
          )[0]
        : {};
      procedureSelect = {
        title: texts?.procedures?.governmentEmployee.title,
        content: {
          text: procedureSelect?.content?.text,
          price: procedureSelect?.content?.price,
        },
      };
      break;
    case typeflowsProcedures.ulaInstitutionSocialService:
      procedureSelect = proceduresAll
        ? proceduresAll.filter(
            (e) => e.type === typeflowsProcedures.socialService
          )[0]
        : {};
      procedureSelect = {
        title: texts?.procedures?.ulaInstitutionSocialService.title,
        content: {
          text: procedureSelect?.content?.text,
          price: procedureSelect?.content?.price,
        },
      };
      break;
    case typeflowsProcedures.elderOrIllSocialService:
      procedureSelect = proceduresAll
        ? proceduresAll.filter(
            (e) => e.type === typeflowsProcedures.socialService
          )[0]
        : {};
      procedureSelect = {
        title: texts?.procedures?.elderOrIllSocialService.title,
        content: {
          text: procedureSelect?.content?.text,
          price: procedureSelect?.content?.price,
        },
      };
      break;
    case typeflowsProcedures.registerProgramorInstitute:
      procedureSelect = proceduresAll
        ? proceduresAll.filter(
            (e) => e.type === typeflowsProcedures.socialService
          )[0]
        : {};
      procedureSelect = {
        title: texts?.procedures?.registerProgramorInstitute.title,
        content: {
          text: procedureSelect?.content?.text,
          price: procedureSelect?.content?.price,
        },
      };
      break;
    case typeflowsProcedures.degreeInProgress:
      procedureSelect = proceduresAll
        ? proceduresAll.filter(
            (e) => e.type === typeflowsProcedures.degree
          )[0]
        : {};
      procedureSelect = {
        title: texts?.procedures?.degreeInProgress.title,
        content: {
          text: procedureSelect?.content?.text,
          price: procedureSelect?.content?.price,
        },
      };
      break;
    case typeflowsProcedures.degreeGraduate:
      procedureSelect = proceduresAll
        ? proceduresAll.filter(
            (e) => e.type === typeflowsProcedures.degree
          )[0]
        : {};
      procedureSelect = {
        title: texts?.procedures?.degreeGraduate.title,
        content: {
          text: procedureSelect?.content?.text,
          price: procedureSelect?.content?.price,
        },
      };
      break;
    case typeflowsProcedures.scholarship:
      procedureSelect = {
        title: texts?.procedures?.scholarship.title,
        content: {
          text: texts?.procedures?.scholarship.description,
          price: texts?.procedures?.scholarship.price,
        },
      };
      break;
    case typeflowsProcedures.admissionCertificate:
      procedureSelect = {
        title: texts?.procedures?.admissionCertificate.title,
        content: {
          text: texts?.procedures?.admissionCertificate.description,
          price: texts?.procedures?.admissionCertificate.price,
        },
      };
      break;
    case typeflowsProcedures.programChange:
      procedureSelect = {
        title: texts?.procedures?.programChange.title,
        content: {
          text: texts?.procedures?.programChange.description,
          price: texts?.procedures?.programChange.price,
        },
      };
      break;
    default:
      procedureSelect = proceduresAll
        ? proceduresAll.filter((e) => e.type === type.flow)[0]
        : {};
      break;
  }
  setTexts({
    title: procedureSelect?.title || "",
    text: procedureSelect?.content?.text || "",
    price: procedureSelect?.content?.price || "",
  });
  switch (type.flow) {
    case typeflowsProcedures.academyHistory:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.academyHistory}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.studyRecord:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.studyRecord}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.certificateStudy:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.certificateStudy}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.equivalenceStudy:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.equivalenceStudy}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.credential:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.credential}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.reinstatement:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.reinstatement}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.degreeInProgress:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.degreeInProgress}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.degreeGraduate:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.degreeGraduate}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.elderOrIllSocialService:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.elderOrIllSocialService}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.ulaInstitutionSocialService:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.ulaInstitutionSocialService}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.governmentEmployee:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.governmentEmployee}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.registerProgramorInstitute:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.registerProgramorInstitute}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.scholarship:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.scholarship}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.revalidateStudy:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.admissionCertificate:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.admissionCertificate}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    case typeflowsProcedures.programChange:
      setBreadCrumb({
        ...breadCrumb,
        textItems: [
          {
            value: "/",
            text: "Home",
          },
          {
            value: "/procedures-main",
            text: "Trámites",
          },
          {
            value: `/procedures-flows/${typeflowsProcedures.programChange}/${typeStagesProcedures.information}`,
            text: procedureSelect?.title || "",
          },
        ],
      });
      break;
    default:
      break;
  }
};

export const resetFlowProcedures = (dispatch) => {
  dispatch(setStudyRecordReset());
  dispatch(setCertificateStudyReset());
  dispatch(setAcademicHistoryReset());
  dispatch(setCredentialReset());
  dispatch(setEquivalenceStudiesReset());
  dispatch(setReinstatementReset());
  dispatch(setDegreeReset());
  dispatch(setResetSocialServiceProcedures());
  dispatch(setScholarshipReset());
  dispatch(setAdmissionCertificateReset());
  dispatch(setProgramChangeReset());
};
