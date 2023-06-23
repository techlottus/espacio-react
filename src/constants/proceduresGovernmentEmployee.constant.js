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

export const cancelBtnGovernmentEmployee = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnGovernmentEmployee = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};

export const inputGovernmentEmployeeNum = {
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

export const textareaGovernmentEmployee = {
  ...InputInit,
  data: {
    ...InputInit.data,
    type: "textarea",
    label: "Comentarios",
    name: "comments",
    maxlength: 50,
  },
};

export const backBtnGovernmentEmployee = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const requestBtnGovernmentEmployee = {
  ...ButtonInit,
  title: "Solicitar",
  type: "outlined",
  isExpand: true,
};

export const feedbackNoticeGovernmentEmployee = {
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


const uploadGovernmentEmployeeStudy = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
};

export const uploadGEOldLetter = {
  ...uploadGovernmentEmployeeStudy,
  id: 'oldLetter',
}

export const uploadGEPayslip = {
  ...uploadGovernmentEmployeeStudy,
  id:'payslip'
}

export const uploadGEFrontCredential = {
  ...uploadGovernmentEmployeeStudy,
  title: 'Lado anverso',
  id: 'frontCredential'
}

export const uploadGEBackCredential = {
  ...uploadGovernmentEmployeeStudy,
  title: 'Lado reverso',
  id: 'backCredential'
}

export const maxSizeFileInGovernmentEmployee = 2000000;
