import { Validators } from "react-reactive-form";

export const getSupportSchoolValidators = (values) => {
  return {
    description: [values.description || "", Validators.required],
  };
};
