import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../helpers/auth";
import { typesModality } from "../../types/typesProcedures";


export const getEquivalenceStudiesValidators = (values) => {
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

export const getEquivalenceStudiesDocumentationValidatorsWithDelivery = (values) => {
  return {
    birthCert:  [values.birthCert ,[Validators.required]],
    schoolCert: [values.schoolCert ,[Validators.required]],
    equivalenceCert: [values.equivalenceCert ,[Validators.required]],
    preEquivalences: [values.preEquivalences ,[Validators.required]],
    solicitudeEquivalences: [values.solicitudeEquivalences ,[Validators.required]],
  }
}

export const getEquivalenceStudiesDocumentationValidatorsWithoutDelivery = (values) => {
  return {
    birthCert: [values.birthCert ,[Validators.required]],
    schoolCert: [values.schoolCert ,[Validators.required]],
    equivalenceCert: [values.equivalenceCert ,[Validators.required]],
    preEquivalences: [values.preEquivalences ,[Validators.required]],
  }
}

export const getEquivalenceStudiesDocumentationValidators = (
  values,
  type = "",
) => {
  switch(type) {
    case typesModality.withDelivery:
      return getEquivalenceStudiesDocumentationValidatorsWithDelivery(values)
    case typesModality.withoutDelivery:
      return getEquivalenceStudiesDocumentationValidatorsWithoutDelivery(values)
    default:
      return getEquivalenceStudiesDocumentationValidatorsWithDelivery(values)
  }
}
