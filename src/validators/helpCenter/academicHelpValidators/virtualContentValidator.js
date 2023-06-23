import { Validators } from "react-reactive-form";

export const getVirtualContentFormValidators = (values) => {
  return {
    selectCheckboxes: [values.selectCheckboxes || ""],
    assignment: [values.assignment || "", Validators.required],
    reportedAssignment: [values.reportedAssignment || "", Validators.required],
    activity: [values.activity || "", Validators.required],
    selectAdesRequest: [values.selectAdesRequest || "", Validators.required],
    description: [values.description || "", Validators.required],
  };
};
