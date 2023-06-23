import React from "react";
import { Switch,Route, Redirect } from 'react-router-dom';
import FaqsHelpCenter from "../flow/HelpCenter/Pages/FaqsHelpCenter/FaqsHelpCenter";
import AcademicHelpFlow from "../flow/HelpCenter/Pages/AcademicHelpFlow/AcademicHelpFlow";
import DashboardHelpCenter from "../flow/HelpCenter/Pages/DashboardHelpCenter/DashboardHelpCenter";
import FinancialHelpFlow from "../flow/HelpCenter/Pages/FinancialHelpFlow/FinancialHelpFlow";
import ProceduresHelpFlow from "../flow/HelpCenter/Pages/ProceduresHelpFlow/ProceduresHelpFlow";
import PsychopedagogicalHelpFlow from "../flow/HelpCenter/Pages/PsychopedagogicalHelpFlow/PsychopedagogicalHelpFlow";
import TechnicalHelpFlow from "../flow/HelpCenter/Pages/TechnicHelpFlow/TechnicHelpFlow";
import SearchResults from "../flow/HelpCenter/Pages/SearchResults/SearchResults";
import DoubtsFormOnlineClasses from "../flow/HelpCenter/FormPages/DoubtsFormOnlineClasses/DoubtsFormOnlineClasses";
import SupportSchoolServiceForm from "../flow/HelpCenter/FormPages/SupportSchoolServiceForm/SupportSchoolServiceForm";
import ExtensionRequestForm from "../flow/HelpCenter/FormPages/ExtensionRequestForm/ExtensionRequestForm";
import AcademicActivitiesHelpForm from"../flow/HelpCenter/FormPages/AcademicActivitiesHelpForm/AcademicActivitiesHelpForm";
import AcademicVirtualContentForm from "../flow/HelpCenter/FormPages/AcademicVirtualContentHelpForm/AcademicVirtualContentForm";
import AcademicProfessorsFeedbackForm from "../flow/HelpCenter/FormPages/AcademicProfessorsFeedbackForm/AcademicProfessorsFeedbackForm";
import FinancialHelpClarificationForm from "../flow/HelpCenter/FormPages/FinancialHelpClarificationForm/FinancialHelpClarificationForm";
import GradesClarificationForm from "../flow/HelpCenter/FormPages/GradesClarificationForm/GradesClarificationForm";
import AcademicRegistrationSubjectsForm from "../flow/HelpCenter/FormPages/AcademicRegistrationSubjectsForm/AcademicRegistrationSubjectsForm";
import TechnicalHelpLibraryAndCollectionsForm from "../flow/HelpCenter/FormPages/TechnicalHelpFormPages/TechicHelpLibraryAndCollectionsForm/TechnicalHelpLibraryAndCollectionsForm";
import AcademicHelpConfirm from "../flow/HelpCenter/ConfirmPages/AcademicHelp/AcademicHelpConfirm";
import FinantialHelpConfirm from "../flow/HelpCenter/ConfirmPages/FinantialHelp/FinantialHelpConfirm";
import ProceduresHelpConfirm from "../flow/HelpCenter/ConfirmPages/ProceduresHelp/ProceduresHelpConfirm";
import TechnicalHelpConfirm from "../flow/HelpCenter/ConfirmPages/TechnicalHelp/TechnicalHelpConfirm";
import OtherAreasForm from "../flow/HelpCenter/FormPages/OtherAreasForm/OtherAreasForm";
import ContactAnAdvisorForm from "../flow/HelpCenter/FormPages/ContactAnAdvisorForm/ContactAnAdvisorForm";
import DirectoryHelpCenter from "../flow/HelpCenter/Pages/DirectoryHelpCenter/DirectoryHelpCenter";


const HelpCenterRoutes = () => {
  return (
    <>
      <Switch>
        {/* Routes of forms */}
        <Route exact path="/help-center/flow/academic-help/grades-clarification" component={GradesClarificationForm}/>
        <Route exact path="/help-center/flow/academic-help/doubts-classes-online" component={DoubtsFormOnlineClasses}/>
        <Route exact path="/help-center/flow/academic-help/extension-request" component={ExtensionRequestForm}/>
        <Route exact path="/help-center/flow/academic-help/registration-subjects" component={AcademicRegistrationSubjectsForm}/>
        <Route exact path="/help-center/flow/academic-help/activities-help" component={AcademicActivitiesHelpForm}/>
        <Route exact path="/help-center/flow/academic-help/virtual-content-help" component={AcademicVirtualContentForm}/>
        <Route exact path="/help-center/flow/academic-help/professors-feedback" component={AcademicProfessorsFeedbackForm}/>
        <Route exact path="/help-center/flow/procedures-help/support-school-service" component={SupportSchoolServiceForm}/>
        <Route exact path="/help-center/flow/procedures-help/contact-advisor" component={ContactAnAdvisorForm}/>
        <Route exact path="/help-center/flow/financial-help/payment-clarification" component={FinancialHelpClarificationForm}/>
        <Route exact path="/help-center/flow/technical-help/library-and-collections" component={TechnicalHelpLibraryAndCollectionsForm}/>
        <Route exact path="/help-center/flow/procedures-help/other-areas-help-solicitude" component={OtherAreasForm}/>

        {/* Routes for confirmation view*/}
        <Route exact path="/help-center/flow/academic-help/registration-subjects/confirm" component={AcademicHelpConfirm}/>
        <Route exact path="/help-center/flow/academic-help/doubts-classes-online/confirm" component={AcademicHelpConfirm}/>
        <Route exact path="/help-center/flow/academic-help/grades-clarification/confirm" component={AcademicHelpConfirm}/>
        <Route exact path="/help-center/flow/academic-help/extension-request/confirm" component={AcademicHelpConfirm}/>
        <Route exact path="/help-center/flow/academic-help/activities-help/confirm" component={AcademicHelpConfirm}/>
        <Route exact path="/help-center/flow/academic-help/professors-feedback/confirm" component={AcademicHelpConfirm}/>
        <Route exact path="/help-center/flow/academic-help/virtual-content-help/confirm" component={AcademicHelpConfirm}/>
        <Route exact path="/help-center/flow/procedures-help/support-school-service/confirm" component={ProceduresHelpConfirm}/>
        <Route exact path="/help-center/flow/procedures-help/other-areas-help-solicitude/confirm" component={ProceduresHelpConfirm}/>
        <Route exact path="/help-center/flow/procedures-help/contact-advisor/confirm" component={ProceduresHelpConfirm}/>
        <Route exact path="/help-center/flow/financial-help/payment-clarification/confirm" component={FinantialHelpConfirm}/>
        <Route exact path="/help-center/flow/technical-help/library-and-collections/confirm" component={TechnicalHelpConfirm}/>

        {/* Routes of help center */}
        <Route exact path="/help-center/flow/academic-help" component={AcademicHelpFlow}/>
        <Route exact path="/help-center/flow/technical-help" component={TechnicalHelpFlow}/>
        <Route exact path="/help-center/flow/financial-help" component={FinancialHelpFlow}/>
        <Route exact path="/help-center/flow/psychopedagogical-help" component={PsychopedagogicalHelpFlow}/>
        <Route exact path="/help-center/flow/procedures-help" component={ProceduresHelpFlow}/>
        <Route exact path="/help-center/dashboard" component={DashboardHelpCenter} />
        <Route exact path="/help-center/search-results" component={SearchResults} />
        <Route exact path="/help-center/faqs" component={FaqsHelpCenter} />
        <Route exact path="/help-center/directory" component={DirectoryHelpCenter} />
        <Redirect to="/help-center/dashboard" />  
      </Switch>
    </>
  );
};

export default HelpCenterRoutes;