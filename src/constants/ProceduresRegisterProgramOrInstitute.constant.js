
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

export const selectRegisterProgramOrInstitute = {
  name: "selectSocialServiceType",
  data: {
    ...selectInit,
    textDefault: "*Tipo de servicio social",
  },
};


export const cancelBtnRegisterProgramOrInstitute = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnRegisterProgramOrInstitute = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};


export const inputRegisterProgramOrInstituteNum = {
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

export const backBtnRegisterProgramOrInstitute = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const requestBtnRegisterProgramOrInstitute = {
  ...ButtonInit,
  title: "Solicitar",
  type: "outlined",
  isExpand: true,
};

export const feedbackNoticeRegisterProgramOrInstitute = {
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

const uploadRegisterProgramOrInstitute = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
};


export const signTicket = {
  ...uploadRegisterProgramOrInstitute,
  id: "signTicket",
};

export const rfcOrConstitutive = {
  ...uploadRegisterProgramOrInstitute,
  id: "rfcOrConstitutive",
};

export const maxSizeFileInRegisterProgramOrInstitute = 20000;

export const requirementGuideLinkRegisterProgram = {
  text: 'Guía de requisitos',
  size: 'medium',
  isBold: false,
  disabled: false,
  id: '123',
  icon: 'arrow_forward',
}

export const registerFormatGuideLinkRegisterProgram = {
  text: 'Registro de programas de servicio social',
  size: 'medium',
  isBold: false,
  disabled: false,
  id: '123',
  icon: 'arrow_forward',
}
