import { typesFlowsFormsHelpCenter } from "../../types/typesHelpCenter";
import {postAcademicActivitiesService} from './academicHelpMiddlewares/academicActivitiesMiddleware'
import {postProfessorsFeedbackService} from './academicHelpMiddlewares/academicProfessorsFeedbackMiddleware'
import { postAcademicRegistrationSubjectsService } from "./academicHelpMiddlewares/academicRegistrationSubjectsMiddleware";
import {postVirtualContentService} from './academicHelpMiddlewares/academicVirtualContentMiddleware'
import {postPaymentClarificationService} from './financialHelpMiddleware/financialPyamentClarificationMiddleware'
import { postTechnicalLibraryAndCollectionsService } from "./technicalHelpMiddlewares/technicalLibraryAndCollectionsMiddleware";
export const helpCenterRequests = (type, history, data, file, recordTypeId) => {
  return (dispatch) => {
    switch (type) {
      case typesFlowsFormsHelpCenter.activitiesHelp:
        dispatch( postAcademicActivitiesService(data, recordTypeId, file, history));
        break;
      case typesFlowsFormsHelpCenter.professorsFeedbackHelp:
        dispatch(postProfessorsFeedbackService(data, recordTypeId, history));
        break;
      case typesFlowsFormsHelpCenter.virtualContentHelp:
        dispatch(postVirtualContentService(data, recordTypeId, file, history));
        break;
      case typesFlowsFormsHelpCenter.paymentClarificationHelp:
        dispatch(postPaymentClarificationService(data, recordTypeId, file, history));
        break;
      case typesFlowsFormsHelpCenter.registrationsubjects:
        dispatch(postAcademicRegistrationSubjectsService(data, recordTypeId, file, history));
        break;
      case typesFlowsFormsHelpCenter.technicalHelpLibraryAndCollections:
        dispatch(postTechnicalLibraryAndCollectionsService(data, recordTypeId, file, history));
        break;
      default:
        break;
    }
  };
};
