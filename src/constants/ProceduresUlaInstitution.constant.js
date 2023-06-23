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
    onPaste: true,
    placeholder: "",
    autocomplete: "off",
    disabled: false,
    onlyNumbers: false,
    alphanumeric: false,
    alphabetical: false,
    pattern: "",
    maxlength: "100"
  },
  value: "",
  hasError: false,
  errorMessage: "",
};

export const cancelBtnUlaInstitution = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnUlaInstitution = {
  ...ButtonInit,
  title: "Solicitar",
  type: "outlined",
  isExpand: true,
};

export const inputUlaInstitutionNum = {
  ...InputInit,
  data: {
    ...InputInit.data,
    maxlength: "10",
    type: "text",
    onlyNumbers: true,
    label: 'Teléfono',
    pattern: "^d{3}-d{3}-d{4}$",
    name: "phone",
  },
  value: "",
  errorMessage: 'Se necesitan 10 caracteres numéricos'
};

export const inputUlaInstitutionName = {
  ...InputInit,
  data: {
    ...InputInit.data,
    maxlength: "10",
    type: "text",
    alphabetical: true,
    label: '*Nombre de la institución',
    pattern: "^d{3}-d{3}-d{4}$",
    name: "institutionName",
  },
  value: "",
  errorMessage: 'Se requiere el nombre de la institución'
};

export const inputUlaInstitutionManager = {
  ...InputInit,
  data: {
    ...InputInit.data,
    maxlength: "10",
    type: "text",
    alphabetical: true,
    label: '*Responsable del programa',
    name: "programManager",
  },
  value: "",
  errorMessage: 'Se requiere el responsable del programa'
};


export const textareaUlaInstitution = {
  ...InputInit,
  data: {
    ...InputInit.data,
    type: "textarea",
    label: "Comentarios",
    name: "comments",
    maxlength: "100",
  },
};

export const backBtnUlaInstitution = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const requestBtnUlaInstitution = {
  ...ButtonInit,
  title: "Solicitar",
  type: "outlined",
  isExpand: true,
};

export const feedbackNoticeUlaInstitution = {
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

export const requirementGuideLinkUlaInsituttion = {
  text: 'Guía de requisitos',
  size: 'medium',
  isBold: false,
  disabled: false,
  id: '123',
  icon: 'arrow_forward',
}

export const conventionsLinkUlaInsituttion = {
  text: 'Convenios ULA',
  size: 'medium',
  isBold: false,
  disabled: false,
  id: '123',
  icon: 'file_download',
}