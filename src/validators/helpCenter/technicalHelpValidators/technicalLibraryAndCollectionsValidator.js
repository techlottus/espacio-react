import { Validators } from "react-reactive-form";

export const getTechnicalLibraryAndCollectionsValidators = (values) => {
  return {
    selectCheckboxes: [values.selectCheckboxes || "",Validators.required],
    teacher: [values.teacher || "", Validators.required],
    activity: [values.activity || "", Validators.required],
    subject: [values.subject || "", Validators.required],
    selectAdesRequest: [values.selectAdesRequest || "", Validators.required],
    description: [values.description || ""],
  };
};