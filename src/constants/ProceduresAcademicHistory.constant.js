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

export const cancelBtnAcademicHistory = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnAcademicHistory = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};

export const backBtnAcademicHistory = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const sendBtnAcademicHistory = {
  ...ButtonInit,
  title: "Solicitar",
  type: "outlined",
  isExpand: true,
};

export const uploadAcademicHistory = {
  title: "Carga de documento",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "academicHistory"
};

export const feedbackAcademicHistory = {
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

export const typesInputs = {
  input: "input",
  select: "select",
  upload: "upload",
};

export const inputPhoneAcademicHistory = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    label: 'Teléfono',
    name: "phone",
    maxlength: "10",
    type: "text",
    onlyNumbers: true,
    pattern: "^d{3}-d{3}-d{4}$",
  },
  errorMessage: 'Se necesitan 10 caracteres numéricos'
};

export const btnModalAcademicExit = {
  ...ButtonInit,
  title: "Regresar",
  type: "outlined",
};
export const btnModalAcademicContinue = {
  ...ButtonInit,
  title: "Continuar",
};

export const selectTypeDeliveryAcademicHistory = {
  typeCmp: typesInputs.select,
  name: "selectTypeDelivery",
  data: {
    ...selectInit,
    textDefault: "*Tipo de entrega",
  },
};

export const selectDeliveryCampusAcademicHistory = {
  ...selectInit,
  name: "selectCampusDelivery",
  textDefault: "*Campus de entrega",

};

export const textareaAcademicHistory = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    name: "comments",
    type: "textarea",
    label: "Comentarios",
  },
};

export const maxSizeFileInAcademicHistory = 2000000;

