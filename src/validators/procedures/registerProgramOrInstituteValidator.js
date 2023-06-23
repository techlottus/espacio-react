import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../helpers/auth";

export const getRegisterProgramOrInstituteValidator = (values) => {
    return {
        phone: [
          values.phone || getValuesOfAuth().phone,
          [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
        ],
    };
}

export const getRegisterProgramOrInstituteDocumentationValidators = () => {
    return {
      signTicket: [null ,[Validators.required]],
      rfcOrConstitutive: [null ,[Validators.required]],
    }
  }
  