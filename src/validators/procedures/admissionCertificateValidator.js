import { Validators } from "react-reactive-form";
import { getValuesOfAuth } from "../../helpers/auth";

export const getAdmissionCertificateInfoValidators = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    countryOfBirth: [values.countryOfBirth, [Validators.required]],
    countryOfPriorStudies: [values.countryOfPriorStudies, [Validators.required]],
    schoolOfOrigin: [values.schoolOfOrigin, [Validators.required]],
    dateStudiesStarted: [values.dateStudiesStarted || "", Validators.required],
    dateStudiesFinished: [values.dateStudiesFinished || "", Validators.required],
    comments: [values.comments],
  };
};

export const getAdmissionCertificateDocumentationValidators = () => {
  return {
    birthCert: [null, [Validators.required]],
    highSchoolCert: [null, [Validators.required]],
    bachelorCert: [null, [Validators.required]],
    notes: [null, [Validators.required]],
  };
};
