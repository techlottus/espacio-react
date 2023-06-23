import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../../helpers/auth";


export const getUlaInstitutionValidator = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    institutionName: [values?.institutionName || "", Validators.required],
    programManager: [values?.programManager || "", Validators.required],
    comments: [values.comments || ""],
  };
};