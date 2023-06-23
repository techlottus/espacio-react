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

const selectInit = {
  textDefault: "Option Default",
  disabled: false,
  reset: false,
  isLabel: true,
};

export const inputScholarshipNum = {
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

export const textareaScholarship = {
  ...InputInit,
  data: {
    ...InputInit.data,
    type: "textarea",
    label: "Comentarios",
    name: "comments",
    maxlength: "100",
  },
};

export const cancelBtnScholarship = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnScholarship = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};

export const backBtnScholarship = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const requestBtnScholarship = {
  ...ButtonInit,
  title: "Enviar",
  type: "outlined",
  isExpand: true,
};

export const selectTypeRequest = {
  ...selectInit,
  name: 'selectTypeRequest',
  textDefault: "*Tipo de solicitud",
  disabled: true,
};

export const uploadScholarship = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "requestScholarship",
};

export const uploadAcademicHistory = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "requestScholarshipAcademicHistory",
};

export const uploadProofPayment = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "requestScholarshipProofPayment",
};

export const uploadDiscountCard = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "requestScholarshipDiscountCard",
};

export const uploadCredentialINE = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: "requestScholarshipCredentialINE",
};


export const maxSizeFileScholarship = 2000000;
