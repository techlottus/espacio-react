
import React from "react";
import { Switch,Route, Redirect } from 'react-router-dom';
import { typeflowsProcedures, typeStagesProcedures } from "../constants/Procedures.constant";
import AcademicHistoryDocuments from "../flow/Procedures/Flows/AcademicHistory/AcademicHistoryDocuments";
import AcademicHistoryInformation from "../flow/Procedures/Flows/AcademicHistory/AcademicHistoryInformation";
import CertificateStudiesDocuments from "../flow/Procedures/Flows/CertificateStudies/CertificateStudiesDocuments";
import CertificateStudiesInformation from "../flow/Procedures/Flows/CertificateStudies/CertificateStudiesInformation";
import StudyRecordDocuments from "../flow/Procedures/Flows/StudyRecord/StudyRecordDocuments";
import StudyRecordInformation from "../flow/Procedures/Flows/StudyRecord/StudyRecordInformation";
import Calendar from "../components/Calendar/Calendar";
import EquivalenceStudiesInformation from "../flow/Procedures/Flows/EquivalenceStudies/EquivalenceStudiesInformation";
import EquivalenceStudiesDocuments from "../flow/Procedures/Flows/EquivalenceStudies/EquivalenceStudiesDocuments";
import CredentialDocuments from "../flow/Procedures/Flows/Credential/CredentialDocuments";
import CredentialInformation from "../flow/Procedures/Flows/Credential/CredentialInformation";
import ReinstatementInformation from "../flow/Procedures/Flows/Reinstatement/ReinstatementInformation";
import ReinstatementDocuments from "../flow/Procedures/Flows/Reinstatement/ReinstatementDocuments";
import ElderOrIllSocialServiceInformation from "../flow/Procedures/Flows/ElderOrIllSocialService/ElderOrIllSocialServiceInformation";
import ElderorIllSocialServiceDocuments from "../flow/Procedures/Flows/ElderOrIllSocialService/ElderOrIllSocialServiceDocuments";
import UlaInstitutionInformation from "../flow/Procedures/Flows/SocialService/ulaInstitution/UlaInstitutionInformation";
import RegisterProgramOrInstituteInformation from "../flow/Procedures/Flows/RegisterProgramOrInstitute/RegisterProgramOrInstituteInformation";
import RegisterProgramOrInstituteDocuments from "../flow/Procedures/Flows/RegisterProgramOrInstitute/RegisterProgramOrInstituteDocuments";
import DegreeInProgressInformation from "../flow/Procedures/Flows/Degree/DegreeInProgress/DegreeInProgressInformation";
import DegreeInProgressDocuments from "../flow/Procedures/Flows/Degree/DegreeInProgress/DegreeInProgressDocuments";
import DegreeGraduateInformation from "../flow/Procedures/Flows/Degree/DegreeGraduate/DegreeGraduateInformation";
import DegreeGraduateDocuments from "../flow/Procedures/Flows/Degree/DegreeGraduate/DegreeGraduateDocuments";
import GovernmentEmployeeInformation from "../flow/Procedures/Flows/GovernmentEmployee/GovernmentEmployeeInformation";
import GovernmentEmployeeDocumentation from "../flow/Procedures/Flows/GovernmentEmployee/GovernmentEmployeeDocumentation";
import ScholarshipInformation from "../flow/Procedures/Flows/Scholarship/ScholarshipInformation";
import ScholarshipDocuments from "../flow/Procedures/Flows/Scholarship/ScholarshipDocuments";
import AdmissionCertificateInformation from "../flow/Procedures/Flows/AdmissionCertificate/AdmissionCertificateInformation";
import AdmissionCertificateDocuments from "../flow/Procedures/Flows/AdmissionCertificate/AdmissionCertificateDocuments";
import RevalidateStudiesDocuments from "../flow/Procedures/Flows/Revalidate/RevalidateStudiesDocuments";
import RevalidateStudiesData from "../flow/Procedures/Flows/Revalidate/RevalidateStudiesData";
import RevalidateStudiesInformation from "../flow/Procedures/Flows/Revalidate/RevalidateStudiesInformation";
import ProgramChangeInformation from "../flow/Procedures/Flows/ProgramChange/ProgramChangeInformation";
import ProgramChangeDocuments from "../flow/Procedures/Flows/ProgramChange/ProgramChangeDocuments";



const ProceduresRoutes = () => {

  return (
    <>
      <Switch>
        <Route path={`/procedures-flows/${typeflowsProcedures.academyHistory}/${typeStagesProcedures.information}`} component={AcademicHistoryInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.academyHistory}/${typeStagesProcedures.documents}`} component={AcademicHistoryDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.studyRecord}/${typeStagesProcedures.information}`} component={StudyRecordInformation}/>
        <Route path={`/procedures-flows/${typeflowsProcedures.studyRecord}/${typeStagesProcedures.documents}`} component={StudyRecordDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.certificateStudy}/${typeStagesProcedures.information}`} component={CertificateStudiesInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.certificateStudy}/${typeStagesProcedures.documents}`} component={CertificateStudiesDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.equivalenceStudy}/${typeStagesProcedures.information}`} component={EquivalenceStudiesInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.equivalenceStudy}/${typeStagesProcedures.documents}`} component={EquivalenceStudiesDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.credential}/${typeStagesProcedures.information}`} component={CredentialInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.credential}/${typeStagesProcedures.documents}`} component={CredentialDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.reinstatement}/${typeStagesProcedures.information}`} component={ReinstatementInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.reinstatement}/${typeStagesProcedures.documents}`} component={ReinstatementDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.elderOrIllSocialService}/${typeStagesProcedures.information}`} component={ElderOrIllSocialServiceInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.ulaInstitutionSocialService}/${typeStagesProcedures.information}`} component={UlaInstitutionInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.elderOrIllSocialService}/${typeStagesProcedures.documents}`} component={ElderorIllSocialServiceDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.registerProgramorInstitute}/${typeStagesProcedures.information}`} component={RegisterProgramOrInstituteInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.registerProgramorInstitute}/${typeStagesProcedures.documents}`} component={RegisterProgramOrInstituteDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.degreeInProgress}/${typeStagesProcedures.information}`} component={DegreeInProgressInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.degreeInProgress}/${typeStagesProcedures.documents}`} component={DegreeInProgressDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.degreeGraduate}/${typeStagesProcedures.information}`} component={DegreeGraduateInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.degreeGraduate}/${typeStagesProcedures.documents}`} component={DegreeGraduateDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.governmentEmployee}/${typeStagesProcedures.information}`} component={GovernmentEmployeeInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.governmentEmployee}/${typeStagesProcedures.documents}`} component={GovernmentEmployeeDocumentation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.scholarship}/${typeStagesProcedures.information}`} component={ScholarshipInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.scholarship}/${typeStagesProcedures.documents}`} component={ScholarshipDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.admissionCertificate}/${typeStagesProcedures.information}`} component={AdmissionCertificateInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.admissionCertificate}/${typeStagesProcedures.documents}`} component={AdmissionCertificateDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.information}`} component={RevalidateStudiesInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.data}`} component={RevalidateStudiesData} />
        <Route path={`/procedures-flows/${typeflowsProcedures.revalidateStudy}/${typeStagesProcedures.documents}`} component={RevalidateStudiesDocuments} />
        <Route path={`/procedures-flows/${typeflowsProcedures.programChange}/${typeStagesProcedures.information}`} component={ProgramChangeInformation} />
        <Route path={`/procedures-flows/${typeflowsProcedures.programChange}/${typeStagesProcedures.documents}`} component={ProgramChangeDocuments} />
        <Route exact path="/school-calendar" component={Calendar} />
        <Redirect to="/procedures-main" />
      </Switch>
    </>
  );
};

export default ProceduresRoutes;
