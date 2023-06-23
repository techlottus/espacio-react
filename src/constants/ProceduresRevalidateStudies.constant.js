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

export const typesInputs = {
  input: "input",
  upload: "upload",
};

export const uploadInit = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "",
};

export const inputRevalidateNum = {
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

export const revalidateFirstStepForm = {
  countryBirthInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*País de nacimiento",
      name: "countryOfBirth",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo es obligatorio",
  },
  countryStudyPreviousInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*País de estudios del nivel inmediato anterior",
      name: "countryOfPriorStudies",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo es obligatorio",
  },
  nameSchoolOriginInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Nombre de escuela de procedencia",
      name: "schoolOfOrigin",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo es obligatorio",
  },
  streetInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Calle",
      name: "street",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo es obligatorio",
  },
  numberInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Número",
      name: "number",
      type: "text",
      alphabetical: false,
      alphanumeric: false,
      onlyNumbers: true,
      mask: ''
    },
    errorMessage: "El campo es obligatorio",
  },
  neighborhoodInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Colonia",
      name: "neighborhood",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo es obligatorio",
  },
  postalCodeInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*C.P.",
      name: "cp",
      type: "text",
      alphabetical: false,
      alphanumeric: false,
      onlyNumbers: true,
      maxlength: '5',

    },
    errorMessage: "El campo es obligatorio",
  },
  townInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Población",
      name: "population",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo es obligatorio",
  },
  cityInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Ciudad",
      name: "city",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo es obligatorio",
  },
  entityInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Entidad",
      name: "entity",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo es obligatorio",
  },
};

export const revalidateSecondStepForm = {
  phoneInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Teléfono",
      name: "schoolPhone",
      type: "text",
      onlyNumbers: true,
      maxlength: '10'
    },
    errorMessage: "El campo es obligatorio",
  },
  emailInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Correo",
      name: "schoolEmail",
      type: "text",
      alphanumeric: false,
      alphabetical: false,
      onlyNumbers: false
    },
    errorMessage: "El campo es obligatorio",
  },
  startDateInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Fecha inicio del nivel anterior (dd/mm/aaaa)",
      name: "startDatePreviousLevel",
      type: "text",
      alphabetical: false,
      alphanumeric: false,
      mask: '00/00/0000'
    },
    errorMessage: "El campo es obligatorio",
  },
  endDateInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Fecha fin del nivel anterior (dd/mm/aaaa)",
      name: "endDatePreviousLevel",
      type: "text",
      alphabetical: false,
      alphanumeric: false,
      mask: '00/00/0000'
    },
    errorMessage: "El campo es obligatorio",
  },
  commentsInput: {
    ...InputInit,
    types: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "comments",
      type: "textarea",
      label: "*Comentarios",
      maxlength: 100,
    },
  },
};

export const revalidateThirdStepForm = {
  uploadBirthCert: {
    ...uploadInit,
    types: typesInputs.upload,
    disabled: false,
    id: "birthCert",
    errorMessage: "Error al cargar el archivo",
  },
  uploadStudyCert: {
    ...uploadInit,
    types: typesInputs.upload,
    disabled: false,
    id: "studyCert",
    errorMessage: "Error al cargar el archivo",
  },
  uploadPrevLevel: {
    ...uploadInit,
    types: typesInputs.upload,
    disabled: false,
    id: "prevLevel",
    errorMessage: "Error al cargar el archivo",
  },
  uploadNotesEdu: {
    ...uploadInit,
    types: typesInputs.upload,
    disabled: false,
    id: "notesEdu",
    errorMessage: "Error al cargar el archivo",
  },
};

export const cancelBtnRevalidate = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnRevalidate = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};

export const backBtnRevalidate = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const requestBtnRevalidate = {
  ...ButtonInit,
  title: "Enviar",
  type: "outlined",
  isExpand: true,
};

export const feedbackNoticeRevalidate = {
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

export const maxSizeFileRevalidate = 2000000;
