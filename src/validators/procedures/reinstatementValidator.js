import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../helpers/auth";

export const getReinstatementValidators = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    comments: [values.comments || ""],
  }
}

export const getReinstatementDocumentationValidators = () => {
    return {
        requestReinstatement: [null ,[Validators.required]],
    }
}