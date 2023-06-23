import { Validators } from "react-reactive-form";
import { typesFormHelpCenterAcademicRegistrationSubjects } from "../../../types/typesHelpCenter";

export const getAcademicRegistrationSubjectsValidators = (type,values) => {
  switch(type) {
    case typesFormHelpCenterAcademicRegistrationSubjects.notSubjectsCorrects:
    case typesFormHelpCenterAcademicRegistrationSubjects.changeSubjects:
      return {
        selectCheckboxes: [values.selectCheckboxes || "",Validators.required],
        description: [values.description || "", Validators.required],
        selectAdesRequest: [values.selectAdesRequest || "", Validators.required],
      };
    default:
      return {
        selectCheckboxes: [values.selectCheckboxes || "",Validators.required],
        paymentDate: [values.paymentDate || "", Validators.required],
        paymentMount: [values.paymentMount || "", Validators.required],
        paymentMethod: [values.paymentMethod || "", Validators.required],
        description: [values.description || "", Validators.required],
        selectAdesRequest: [values.selectAdesRequest || "", Validators.required],
      };
  }
};