import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../helpers/auth";

export const getRevalidateStudiesPartOneValidators = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    countryOfBirth: [values.countryOfBirth || "",[Validators.required]],
    countryOfPriorStudies: [values.countryOfPriorStudies|| "",[Validators.required]],
    schoolOfOrigin: [values.schoolOfOrigin || "",[Validators.required]],
    street: [values.street || "",[Validators.required]],
    number: [values.number || "",[Validators.required]],
    neighborhood: [values.neighborhood || "",[Validators.required]],
    cp: [values.cp || "",[Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
    population: [values.population || "",[Validators.required]],
    city: [values.city || "",[Validators.required]],
    entity: [values.entity || "",[Validators.required]],
  }
}

export const getRevalidateStudiesPartTwoValidators = (values) => {
  return {
    comments: [values.comments || "",[Validators.required]],
    schoolPhone: [values.schoolPhone || "", [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]],
    schoolEmail: [values.schoolEmail || "",[Validators.required, Validators.email]],
    startDatePreviousLevel: [values.startDatePreviousLevel || "",[Validators.required]],
    endDatePreviousLevel: [values.endDatePreviousLevel || "",[Validators.required]],
  }
}

export const getRevalidateStudiesDocumentationValidators = () => {
  return {
    birthCert: [null ,[Validators.required]],
    studyCert: [null ,[Validators.required]],
    prevLevel: [null ,[Validators.required]],
    notesEdu: [null ,[Validators.required]],
  }
}
