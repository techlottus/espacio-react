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
    maxlength: "100",
  },
  value: "",
  hasError: false,
  errorMessage: "",
};

export const inputProgramChangeNum = {
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

const ButtonInit = {
  type: "primary",
  title: "",
  size: "small",
  icon: "",
  lyIcon: false,
  disabled: false,
  isExpand: false,
};

export const textareaProgramChange = {
  ...InputInit,
  data: {
    ...InputInit.data,
    type: "textarea",
    label: "Comentarios",
    name: "comments",
    maxlength: "100",
  },
};
export const cancelBtnProgramChange = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnProgramChange = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};

export const backBtnProgramChange = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const requestBtnProgramChange = {
  ...ButtonInit,
  title: "Enviar",
  type: "outlined",
  isExpand: true,
};

export const uploadProgramChange = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "requestProgramChange",
};

export const feedbackNoticeProgramChange = {
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

export const maxSizeFileProgramChange = 2000000;
