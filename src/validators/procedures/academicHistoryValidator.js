import { Validators } from "react-reactive-form";
import { typesDelivaryProcedures } from "../../constants/Procedures.constant";
import { getValuesOfAuth } from "../../helpers/auth";
import { typesModality } from "../../types/typesProcedures";

const getAcademicHistoryWithoutCampus = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    selectTypeDelivery: [values.selectTypeDelivery || "", Validators.required],
    comments: [values.comments || ""],
  };
};

const getAcademicHistoryWithCampus = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    selectTypeDelivery: [values.selectTypeDelivery || "", Validators.required],
    selectCampusDelivery: [
      values.selectCampusDelivery || "",
      Validators.required,
    ],
    comments: [values.comments || ""],
  };
};

const getAcademicHistoryWithoutDelivery = (values) => {
  return {
    phone: [
      values.phone || getValuesOfAuth().phone,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    comments: [values.comments || ""],
  };
};

export const getAcademicHistoryValidators = (
  values,
  type = "",
  typeDelivery = null
) => {
  switch (type) {
    case typesModality.withDelivery:
      if (typeDelivery === typesDelivaryProcedures.fisico) {
        return getAcademicHistoryWithCampus(values);
      } else {
        return getAcademicHistoryWithoutCampus(values);
      }
    case typesModality.withoutDelivery:
      return getAcademicHistoryWithoutDelivery(values);
    default:
      return getAcademicHistoryWithoutCampus(values);
  }
};
