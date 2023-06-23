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
    pattern: "",
    maxlength: "100"
  },
  value: "",
  hasError: false,
  errorMessage: "",
};

export const cancelBtnReinstatement = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnReinstatement = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};

export const inputReinstatementNum = {
  ...InputInit,
  data: {
    ...InputInit.data,
    maxlength: "10",
    type: "text",
    onlyNumbers: true,
    label: 'Teléfono',
    name: "phone",
  },
  value: "5566778844",
  errorMessage: 'Se necesitan 10 caracteres numéricos'
};

export const textareaReinstatement = {
  ...InputInit,
  data: {
    ...InputInit.data,
    type: "textarea",
    label: "Comentarios",
    name: "comments",
    maxlength: 50,
  },
};

export const backBtnReinstatement = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const requestBtnReinstatement = {
  ...ButtonInit,
  title: "Solicitar",
  type: "outlined",
  isExpand: true,
};

export const feedbackNoticeReinstatement = {
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

export const uploadReinstatement = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "requestReinstatement"
};

export const maxSizeFileInReinstatement = 1000000;