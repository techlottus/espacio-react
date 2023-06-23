import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../helpers/auth";

export const getElderOrIllValidator = (values) => {
    return {
        phone: [
          values.phone || getValuesOfAuth().phone,
          [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
        ],
    };
}

export const getElderorIllDocumentationValidators = () => {
    return {
      proof: [null ,[Validators.required]],
      birthCertificate: [null ,[Validators.required]],
    }
  }
  