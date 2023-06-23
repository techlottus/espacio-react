import { Validators } from "react-reactive-form";
import { typesDelivaryProcedures } from "../../constants/Procedures.constant";
import { getValuesOfAuth } from "../../helpers/auth";
import { typesModality } from "../../types/typesProcedures";

const getFormCertificateStudyWithoutCampus = (values,item) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    selectTypeCertificate: [values.selectTypeCertificate || "", Validators.required],
    ...item,
    selectTypeDelivery: [
      values.selectTypeDelivery || "",
      Validators.required,
    ],
    comments: [values.comments || ""],
  }
}

const getFormCertificateStudyWithCampus = (values,item) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    selectTypeCertificate: [values.selectTypeCertificate || "", Validators.required],
    ...item,
    selectTypeDelivery: [
      values.selectTypeDelivery || "",
      Validators.required,
    ],
    selectCampusDelivery: [
      values.selectCampusDelivery || "",
      Validators.required,
    ],
    comments: [values.comments || ""],
  }
}

const getFormCertificateStudyWithoutDelivery = (values,item) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    selectTypeCertificate: [values.selectTypeCertificate || "", Validators.required],
    ...item,
    comments: [values.comments || ""],
  }
}

export const getCertificateStudyDefaultValidators = (values = {}, type='',isShowCertificateRequest,typeDelivery=null) => {
  const item = isShowCertificateRequest ? {
    selectCertificateRequest: [values.selectCertificateRequest || "", Validators.required],
  }: {};
  switch(type) {
    case typesModality.withDelivery:
      if(typeDelivery === typesDelivaryProcedures.fisico) {
        return getFormCertificateStudyWithCampus(values,item)
      }
      else {
        return getFormCertificateStudyWithoutCampus(values,item);
      }
    case typesModality.withoutDelivery:
      return getFormCertificateStudyWithoutDelivery(values,item);
    default:
      return getFormCertificateStudyWithoutCampus(values,item);
  }
}

export const getCertificateStudyDocumentationValidators = () => {
  return {
    certificateStudy: [null ,[Validators.required]],
  }
}