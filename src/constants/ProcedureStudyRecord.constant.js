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
    alphanumeric: false,
    alphabetical: false,
    onlyNumbers: false,
    upperCase: false,
    pattern: "",
    maxlength: "100"
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

export const inputNumberStudyRecord = {
  ...InputInit,
  data: {
    ...InputInit.data,
    name: "phone",
    maxlength: "10",
    type: "text",
    onlyNumbers: true,
    label: 'Teléfono',
    pattern: "^d{3}-d{3}-d{4}$",
  },
  value: "5566778844",
  errorMessage: 'Se necesitan 10 caracteres numéricos'
};

export const selectTypeRecordStudyRecord = {
  ...selectInit,
  textDefault: "*Tipo de constancia",
  name: "selectTypeRecord",
};

export const selectTypeDeliveryStudyRecord = {
  ...selectInit,
  textDefault: "*Tipo de entrega",
  name: "selectTypeDelivery",
};

export const selectCampusDeliveryStudyRecord = {
  ...selectInit,
  textDefault: "*Campus de entrega",
  name: "selectCampusDelivery",
};

export const checkboxStudyRecord = {
  label: "Dirigir a SEDENA",
  disabled: false,
  selected: false,
  name: "isCheck",
};

export const textareaStudyRecord = {
  ...InputInit,
  data: {
    ...InputInit.data,
    type: "textarea",
    label: "Comentarios",
    name: "comments",
  },
};

export const cancelBtnStudyRecord = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: false,
};

export const uploadStudyRecord = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "studyRecord"
};

export const nextBtnStudyRecord = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
};

export const backBtnStudyRecord = {
  ...ButtonInit,
  type: "text",
  title: "Atrás",
};

export const requestBtnStudyRecord = {
  ...ButtonInit,
  type: "outlined",
  title: "Solicitar",
};

export const feedbackNoticeStudyRecord = {
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

export const maxSizeFileInStudyRecord = 2000000;
