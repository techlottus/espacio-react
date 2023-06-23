import { Validators } from "react-reactive-form";

export const getOtherAreasValidators = (values) => {
  return {
    selectCheckboxes: [values.selectCheckboxes || "", Validators.required],
    description: [values.description || "", Validators.required],
  };
};
