import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { paymentReducer } from "../reducers/paymentReducer";
import { termsReducer } from "../reducers/termsReducer";
import { dashboardReducer } from "../reducers/dashboardReducer";
import { loadingReducer } from "../reducers/loadingReducer";
import { headersReducer } from "../reducers/headersReducer";
import { accountStatusReducer } from "../reducers/accountStatusReducer";
import { splashReducer } from "../reducers/splashReducer";
import { loginReducer } from "../reducers/loginReducer";
import { studyRecordReducer } from "../reducers/proceduresReducers/studyRecordReducer";
import { academicHistoryReducer } from "../reducers/proceduresReducers/academicHistoryReducer";
import { certificateStudyReducer } from "../reducers/proceduresReducers/certificateStudiesReducer";
import { textsReducer } from "../reducers/textsReducer";
import { credentialReducer } from "../reducers/proceduresReducers/credentialReducer";
import { proceduresReducer } from "../reducers/proceduresReducers/proceduresReducer";
import { equivalenceStudiesReducer } from "../reducers/proceduresReducers/equivalenceStudiesReducer";
import { reinstatementReducer } from "../reducers/proceduresReducers/reinstatementReducer";
import { academicHelpReducer } from "../reducers/helpCenterReducers/academicHelpReducers/academicHelpReducer";
import { financialHelpReducer } from "../reducers/helpCenterReducers/financialHelpReducers/financialHelpReducer";
import { TechnicalHelpReducer } from "../reducers/helpCenterReducers/technicalHelpReducers/TechnicalHelpReducer";
import { proceduresHelpReducer } from "../reducers/helpCenterReducers/proceduresHelpReducers/procedureshelpReducer";
import { dashboardHelpReducer } from "../reducers/helpCenterReducers/dashboardHelpReducer/dashboardHelpReducer";
import { faqsHelpReducer } from "../reducers/helpCenterReducers/faqsHelpReducer/faqsHelpReducer";
import { degreeReducer } from "../reducers/proceduresReducers/degreeReducer";
import { socialServiceReducer } from "../reducers/proceduresReducers/socialServiceReducer";
import { directoryHelpReducer } from "../reducers/helpCenterReducers/directoryReducer/directoryReducer";
import { scholarshipReducer } from "../reducers/proceduresReducers/scholarshipReducer";
import { admissionCertificateReducer } from "../reducers/proceduresReducers/admissionCertificateReducer";
import { BenefitsReducer } from "../reducers/benefitsReducer";
import { calendarReducer } from "../reducers/proceduresReducers/calendarReducer";
import { revalidateStudiesReducer } from "../reducers/proceduresReducers/revalidateStudiesReducer";
import { programChangeReducer } from "../reducers/proceduresReducers/programChangeReducer";
import { manhattanReducer } from "../reducers/manhattanReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  payment: paymentReducer,
  terms: termsReducer,
  dashboard: dashboardReducer,
  loading: loadingReducer,
  headers: headersReducer,
  accountStatus: accountStatusReducer,
  splash: splashReducer,
  login: loginReducer,
  procedures: proceduresReducer,
  procedureStudyRecord: studyRecordReducer,
  proceduresAcademicHistory: academicHistoryReducer,
  procedureCertificateStudy: certificateStudyReducer,
  texts: textsReducer,
  procedureCredential: credentialReducer,
  procedureEquivalenceStudies: equivalenceStudiesReducer,
  proceduresReinstatement: reinstatementReducer,
  proceduresDegree: degreeReducer,
  proceduresScholarship: scholarshipReducer,
  proceduresSocialService: socialServiceReducer,
  proceduresRevalidateStudies: revalidateStudiesReducer,
  proceduresAdmissionCertificate: admissionCertificateReducer,
  proceduresProgramChange: programChangeReducer,
  helpCenterAcademic: academicHelpReducer,
  helpCenterFinancial: financialHelpReducer,
  helpCenterProcedures: proceduresHelpReducer,
  helpCenterTechnical: TechnicalHelpReducer,
  helpCenterDashboard: dashboardHelpReducer,
  helpCenterFaqs: faqsHelpReducer,
  helpCenterDirectory: directoryHelpReducer,
  benefits: BenefitsReducer,
  calendar: calendarReducer,
  manhattan: manhattanReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
