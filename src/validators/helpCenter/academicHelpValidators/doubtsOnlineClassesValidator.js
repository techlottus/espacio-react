import { Validators } from "react-reactive-form";

export const getDoubtsOnlineClassesValidators = (values) => {
  return {
    selectCheckboxes: [values.selectCheckboxes || "", Validators.required],
    assignment: [values.assignment || "", Validators.required],
    professor: [values.professor || "", Validators.required],
    classDate: [values.classDate || "", Validators.required],
    selectAdesRequest: [values.selectAdesRequest || "", Validators.required],
    description: [values.description || "", Validators.required],
  };
};
