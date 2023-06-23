import { Validators } from "react-reactive-form";

export const getCreditCardValidators = (values) => {
  return {
    creditNumber: [
      values.creditNumber || "",
      [Validators.required, Validators.minLength(16), Validators.maxLength(16)],
    ],
    creditName: [values.creditName || "", [Validators.required]],
    expireDate: [values.expireDate || "", [Validators.required]],
    securityCode: [values.securityCode || "", [Validators.required,  Validators.minLength(3), Validators.maxLength(3)]],
  };
};
