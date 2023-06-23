import { Validators } from "react-reactive-form";

export const getContactAnAdvisorValidators = (values) => {
  return {
    description: [values.description || "", Validators.required],
  };
};
