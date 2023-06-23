import { texts } from "../texts/indexText";

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
    maxlength: "100",
  },
  value: "",
  hasError: false,
  errorMessage: "",
};

export const cancelBtnDegree = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnDegree = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};

export const inputPhoneDegree = {
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

export const btnModalDegreeExit = {
  ...ButtonInit,
  title: "Regresar",
  type: "outlined",
};

export const btnModalDegreeContinue = {
  ...ButtonInit,
  title: "Continuar",
};

export const backBtnDegree = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const btnModalDegreeClose = {
  ...ButtonInit,
  title: "Cerrar",
  type: "outlined",
};

export const btnModalDegreeNext = {
  ...ButtonInit,
  title: "Siguiente",
};

export const btnModalDegreeDocCheck = {
  ...ButtonInit,
  title: "Aceptar",
  isExpand: true,
};

export const requestBtnDegree = {
  ...ButtonInit,
  title: "Enviar solicitud",
  type: "outlined",
  isExpand: true,
};

const selectInit = {
  textDefault: "Option Default",
  disabled: false,
  reset: false,
  isLabel: true,
};

export const typesInputs = {
  input: "input",
  select: "select",
  upload: "upload",
};

export const selectTypeProgramDegree = {
  typeCmp: typesInputs.select,
  name: "selectTypeProgramDegree",
  data: {
    ...selectInit,
    textDefault: "*Selecciona un programa",
  },
};

export const selectTypePaymentDegree = {
  typeCmp: typesInputs.select,
  name: "selectTypePaymentDegree",
  data: {
    ...selectInit,
    textDefault: "*Tipo de pago",
  },
};

export const selectTypeTraditionalPaymentDegree = {
  typeCmp: typesInputs.select,
  name: "selectTypePaymentDegree",
  data: {
    ...selectInit,
    textDefault: "*Tipo de titulación",
  },
};

export const feedbackNoticeDegree = {
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

const uploadDegree = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
};

const uploadIneFront = {
  title: "Lado anverso",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
};

const uploadIneBack = {
  title: "Lado reverso",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
};

export const uploadProcedureDegree = {
  ...uploadDegree,
  id: "procedureDegree",
};

export const uploadPhoto = {
  ...uploadDegree,
  id: "photo",
};

export const uploadPhotoIneFront = {
  ...uploadIneFront,
  id: "ineFront",
};

export const uploadPhotoIneBack = {
  ...uploadIneBack,
  id: "ineBack",
};

export const uploadCurp = {
  ...uploadDegree,
  id: "curp",
};

export const uploadAcadHistory = {
  ...uploadDegree,
  id: "acadHistory",
};

export const uploadReleaseSocialService = {
  ...uploadDegree,
  id: "relSocialService",
};

export const linkCheckCurp = {
  text: texts?.procedures?.degreeInProgress.checkCurp,
  size: "medium",
  isBold: false,
  disabled: false,
  id: "link_curp",
  icon: "search",
};

export const dataProgressModal = {
  title: '',
  progress: 0,
  description: "prueba",
  size: "small",
  disabled: false,
  color: "#002D5D",
};

export const maxSizeFileInDegree = 2000000;

export const requirementDegreeApplicationLink = {
  text: 'Guía de requisitos para solicitud de Titulación',
  size: 'medium',
  isBold: false,
  disabled: false,
  id: '1',
  icon: 'arrow_forward',
}

export const requirementInProcessDegreeLink = {
  text: 'Solicitud en tramite Titulación',
  size: 'medium',
  isBold: false,
  disabled: false,
  id: '2',
  icon: 'arrow_forward',
}

export const requirementsGuideForPhotographyLink = {
  text: 'Guía de requisitos para fotografía',
  size: 'medium',
  isBold: false,
  disabled: false,
  id: '3',
  icon: 'arrow_forward',
}

export const btnModalDegreeBack = {
  ...ButtonInit,
  title: "Anterior",
  type: "outlined",
  isExpand: true,
};
