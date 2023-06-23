import { Validators } from "react-reactive-form";
import { typesDelivaryProcedures } from "../../constants/Procedures.constant";
import { getValuesOfAuth } from "../../helpers/auth";
import { typesModality } from "../../types/typesProcedures";

const getFormStudyRecordWithoutCampus = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    selectTypeRecord: [values.selectTypeRecord || "", Validators.required],
    selectTypeDelivery: [
      values.selectTypeDelivery || "",
      Validators.required,
    ],
    isCheck: [values.isCheck || false],
    comments: [values.comments || ""],
  }
}

const getFormStudyRecordWithCampus = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    selectTypeRecord: [values.selectTypeRecord || "", Validators.required],
    selectTypeDelivery: [
      values.selectTypeDelivery || "",
      Validators.required,
    ],
    selectCampusDelivery: [
      values.selectCampusDelivery || "",
      Validators.required,
    ],
    isCheck: [values.isCheck || false],
    comments: [values.comments || ""],
  }
}

const getFormStudyRecordWithoutDelivery = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    selectTypeRecord: [values.selectTypeRecord || "", Validators.required],
    isCheck: [values.isCheck || false],
    comments: [values.comments || ""],
  }
}

export const getStudyRecordDefaultValidators = (values,type='',typeDelivery=null) => {
  switch(type) {
    case typesModality.withDelivery:
      if(typeDelivery === typesDelivaryProcedures.fisico) {
        return getFormStudyRecordWithCampus(values);
      }
      else {
        return getFormStudyRecordWithoutCampus(values);
      }
    case typesModality.withoutDelivery:
      return getFormStudyRecordWithoutDelivery(values);
    default:
      return getFormStudyRecordWithoutCampus(values);
  }
}
