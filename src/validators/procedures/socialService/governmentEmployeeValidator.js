import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../../helpers/auth";

export const getGovernmentEmployeeValidators = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
  }
}


export const getGovernmentEmployeeDocumentationValidators = () => {
  return {
    oldLetter: [null ,[Validators.required]],
    payslip: [null ,[Validators.required]],
    frontCredential: [null ,[Validators.required]],
    backCredential: [null ,[Validators.required]],
  }
}
