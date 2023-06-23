import { typesFlowsFormsHelpCenter } from "../../types/typesHelpCenter";
import { postAcademicActivitiesService } from "./academicHelpMiddlewares/academicActivitiesMiddleware";
import { postProfessorsFeedbackService } from "./academicHelpMiddlewares/academicProfessorsFeedbackMiddleware";
import { postVirtualContentService } from "./academicHelpMiddlewares/academicVirtualContentMiddleware";
import { postDoubtsOnlineClassesService } from "./academicHelpMiddlewares/doubtsOnlineClassesMiddleware";
import { postGradesClarificationService } from "./academicHelpMiddlewares/gradesClarificationMiddleware";
import { postPaymentClarificationService } from "./financialHelpMiddleware/financialPyamentClarificationMiddleware";
import { postSupportSchoolService } from "./proceduresHelpMiddlewares/supportSchoolMiddleware";
import { postExtensionRequestService } from "./academicHelpMiddlewares/extensionRequestMiddleware";
import { postTechnicalLibraryAndCollectionsService } from "./technicalHelpMiddlewares/technicalLibraryAndCollectionsMiddleware";
import { postAcademicRegistrationSubjectsService } from "./academicHelpMiddlewares/academicRegistrationSubjectsMiddleware";
import { postOtherAreasService } from "./proceduresHelpMiddlewares/otherAreasMiddleware";
import { postContactAnAdvisorService } from "./proceduresHelpMiddlewares/contactAnAdvisorMiddleware";

export const helpCenterRequests = (type, history, data, file, recordTypeId, value) => {
  return (dispatch) => {
    switch (type) {
      case typesFlowsFormsHelpCenter.activitiesHelp:
        dispatch(
          postAcademicActivitiesService(data, recordTypeId, file, history)
        );
        break;
      case typesFlowsFormsHelpCenter.professorsFeedbackHelp:
        dispatch(postProfessorsFeedbackService(data, recordTypeId, history));
        break;
      case typesFlowsFormsHelpCenter.virtualContentHelp:
        dispatch(postVirtualContentService(data, recordTypeId, file, history));
        break;
      case typesFlowsFormsHelpCenter.paymentClarificationHelp:
        dispatch(
          postPaymentClarificationService(data, recordTypeId, file, history)
        );
        break;
      case typesFlowsFormsHelpCenter.doubtsClassesOnlineHelp:
        dispatch(
          postDoubtsOnlineClassesService(data, recordTypeId, file, history)
        );
        break;
      case typesFlowsFormsHelpCenter.gradesClarificationHelp:
        dispatch(
          postGradesClarificationService(data, recordTypeId, file, history)
        );
        break;
      case typesFlowsFormsHelpCenter.extensionRequestHelp:
        dispatch(
          postExtensionRequestService(data, recordTypeId, file, history)
        );
        break;
      case typesFlowsFormsHelpCenter.supportSchoolHelp:
        dispatch(postSupportSchoolService(data, recordTypeId, file, history));
        break;
      case typesFlowsFormsHelpCenter.contactAnAdvisorHelp:
        dispatch(postContactAnAdvisorService(data, recordTypeId, file, history, value));
        break;
      case typesFlowsFormsHelpCenter.otherAreasHelp:
        dispatch(postOtherAreasService(data, recordTypeId, file, history));
        break;
      case typesFlowsFormsHelpCenter.registrationsubjects:
        dispatch(
          postAcademicRegistrationSubjectsService(
            data,
            recordTypeId,
            file,
            history
          )
        );
        break;
      case typesFlowsFormsHelpCenter.technicalHelpLibraryAndCollections:
        dispatch(
          postTechnicalLibraryAndCollectionsService(
            data,
            recordTypeId,
            file,
            history
          )
        );
        break;
      default:
        break;
    }
  };
};
