const termsDefaultTermsTag = {
  idgeneral: "gtm",
  seccion: "terms",
};

export const privacyBtnTermsTag = {
  ...termsDefaultTermsTag,
  elemento: "aviso",
  idsubelement: "",
};

export const switchOnTermsTag = {
  ...termsDefaultTermsTag,
  elemento: "descuentos",
  idsubelement: "on",
};

export const switchOffTermsTag = {
  ...termsDefaultTermsTag,
  elemento: "descuentos",
  idsubelement: "off",
};

export const privacyBtnDeclinedTermsTag = {
  ...termsDefaultTermsTag,
  elemento: "avisotxt",
  idsubelement: "noacepto",
};

export const privacyBtnAcceptTermsTag = {
  ...termsDefaultTermsTag,
  elemento: "avisotxt",
  idsubelement: "acepto",
};

export const termsBtnAcceptTermsTag = {
  ...termsDefaultTermsTag,
  elemento: "terminostxt",
  idsubelement: "acepto",
};

export const termsBtnDeclinedTermsTag = {
  ...termsDefaultTermsTag,
  elemento: "terminostxt",
  idsubelement: "noacepto",
};
