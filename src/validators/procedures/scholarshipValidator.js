import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../helpers/auth";
import { typesModality } from "../../types/typesProcedures";

const controlsDocuments = {
  requestScholarship: [null ,[Validators.required]],
  requestScholarshipAcademicHistory: [null ,[Validators.required]],
  requestScholarshipProofPayment: [null ,[Validators.required]],
  requestScholarshipDiscountCard: [null ,[Validators.required]],
  requestScholarshipCredentialINE: [null ,[Validators.required]],
};

export const getScholarshipValidators = (values) => {
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

export const getScholarshipDocumentationValidatorsWithDelivery = (controls) => {
  return {
    requestScholarship: [null ,[Validators.required]],
  }
}

//Aqui hacer el validador del select este es para escolarizados
export const getScholarshipDocumentationValidatorsWithoutDelivery= (controls) => {
  return {
    ...controls,
    selectTypeRequest: [null , [Validators.required]],
  }
}

export const getScholarshipDocumentationValidators = (type = "") => {
    switch(type) {
      case typesModality.withDelivery:
        return getScholarshipDocumentationValidatorsWithDelivery(controlsDocuments)
      case typesModality.withoutDelivery:
        return getScholarshipDocumentationValidatorsWithoutDelivery(controlsDocuments)
      default:
        return getScholarshipDocumentationValidatorsWithDelivery(controlsDocuments)
    }
}
