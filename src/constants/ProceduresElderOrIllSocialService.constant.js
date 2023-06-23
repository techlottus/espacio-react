
const selectInit = {
  textDefault: "Option Default",
  disabled: false,
  reset: false,
  isLabel: true,
};

const ButtonInit = {
  type: "primary",
  title: "",
  size: "small",
  icon: "",
  lyIcon: false,
  disabled: false,
  isExpand: false,
};

const InputInit = {
  data: {
    label: "",
    name: "",
    type: "text",
    typeButton: "outlined",
    maxlength: "100",
    onPaste: true,
    placeholder: "",
    autocomplete: "off",
    disabled: false,
    alphanumeric: false,
    alphabetical: false,
    onlyNumbers: false,
    upperCase: false,
    pattern: "",
  },
  value: "",
  hasError: false,
  errorMessage: "",
};

export const selectSocialServiceElderOrIll = {
  name: "selectSocialServiceType",
  data: {
    ...selectInit,
    textDefault: "*Tipo de servicio social",
  },
};

export const selectOptionsSocialServiceElderOrIll = [
  {
    active: false,
    text: "$2,750.00 - Certificado Parcial",
    value: "CERC9P6",
    detailId: "1120",
  },
  {
    active: false,
    text: "$2,750.00 - Certificado Total",
    value: "CERC9T5",
    detailId: "1253",
  },
];

export const cancelBtnSocialServiceElderOrIll = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnSocialServiceElderOrIll = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};


export const inputSocialServiceElderOrIllNum = {
  ...InputInit,
  data: {
    ...InputInit.data,
    maxlength: "10",
    type: "text",
    onlyNumbers: true,
    label: "Teléfono",
    name: "phone",
  },
  value: "5566778844",
  errorMessage: "Se necesitan 10 caracteres numéricos",
};

export const backBtnSocialServiceElderOrIll = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const requestBtnSocialServiceElderOrIll = {
  ...ButtonInit,
  title: "Solicitar",
  type: "outlined",
  isExpand: true,
};

export const feedbackNoticeSocialServiceElderOrIll = {
  left: {
    name: "info",
    status: "normal",
  },
  right: {
    name: null,
  },
  type: "alert",
  isTextEvent: false,
  textEvent: "Dismiss",
};

const uploadSocialServiceElderOrIll = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
};


export const uploadProof = {
  ...uploadSocialServiceElderOrIll,
  id: "proof",
};
export const uploadBirthCertificate = {
  ...uploadSocialServiceElderOrIll,
  id: "birthCertificate",
};

export const maxSizeFileInSocialServiceElderOrIll = 2000000;

export const requirementGuideLink = {
  text: 'Guía de requisitos',
  size: 'medium',
  isBold: false,
  disabled: false,
  id: '123',
  icon: 'arrow_forward',
}
