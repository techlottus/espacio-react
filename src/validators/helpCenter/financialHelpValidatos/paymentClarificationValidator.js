import { Validators } from "react-reactive-form";

export const getPaymentClarificationFormValidators = (values) => {
  return {
    selectCheckboxes: [values.selectCheckboxes || "", Validators.required],
    selectAdesRequest: [values.selectAdesRequest || "",Validators.required],
    description: [values.description || "", Validators.required],
  };
};
