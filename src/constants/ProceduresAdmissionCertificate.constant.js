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

export const cancelBtnAdmissionCertificate = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnAdmissionCertificate = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};

export const backBtnAdmissionCertificate = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const sendBtnAdmissionCertificate = {
  ...ButtonInit,
  title: "Enviar",
  type: "outlined",
  isExpand: true,
};

export const uploadAdmissionCertificate = {
  title: "Carga de documento",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
};

export const feedbackAdmissionCertificate = {
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

export const inputPhoneAdmissionCertificate = {
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

export const inputBirthCountryAdmissionCertificate = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    label: '*País de nacimiento',
    name: "countryOfBirth",
    type: "text",
    alphanumeric: false,
    alphabetical: true,
    onlyNumbers: false,
  },
  errorMessage: 'El país de nacimiento es requerido'
};

export const inputStudyCountryAdmissionCertificate = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    label: '*País de estudios inmediatos anteriores',
    name: "countryOfPriorStudies",
    type: "text",
    alphanumeric: false,
    alphabetical: true,
    onlyNumbers: false,
  },
  errorMessage: 'El país de estudios inmediatos anteriores es requerido'
};

export const inputSchoolNameAdmissionCertificate = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    label: '*Nombre de escuela de procedencia',
    name: "schoolOfOrigin",
    type: "text",
  },
  errorMessage: 'El nombre de escuela de procedencia es requerido'
};

export const initDateAdmissionCertificate = {
  name: "dateStudiesStarted",
  textDefault: "Fecha de inicio",
};

export const endDateAdmissionCertificate = {
  name: "dateStudiesFinished",
  textDefault: "Fecha de fin",
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

export const selectOptionsAdmissionCertificate = [
  {
    value: '01',
    active: false,
    text: 'Junio 2018',
  },
  {
    value: '02',
    active: false,
    text: 'Junio 2019',
  },
  {
    value: '03',
    active: false,
    text: 'Junio 2020',
  },
  {
    value: '04',
    active: false,
    text: 'CAMPJunio 2021',
  },
]
export const textareaAdmissionCertificate = {
  ...InputInit,
  data: {
    ...InputInit.data,
    name: "comments",
    type: "textarea",
    label: "Comentarios",
  },
};

export const uploadBirthCert = {
  ...uploadAdmissionCertificate,
  id: 'birthCert',
}

export const uploadHighSchoolCert = {
  ...uploadAdmissionCertificate,
  id:'highSchoolCert'
}

export const uploadBachelorCert = {
  ...uploadAdmissionCertificate,
  id: 'bachelorCert'
}

export const uploadNotes = {
  ...uploadAdmissionCertificate,
  id: 'notes'
}

export const feedbackNoticeAdissionCertificate = {
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

export const maxSizeFileInAdmissionCertificate = 2000000;
