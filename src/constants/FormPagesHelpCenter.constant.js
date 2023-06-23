import { texts } from "../texts/indexText";

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

export const typeFormHelpCenter = {
  academicFormHelp: "academic-form",
};

export const arrowBack = {
  icon: texts?.helpCenter.arrowFormHelpCenter.icon,
  text: texts?.helpCenter.arrowFormHelpCenter.text,
};

const checkboxInit = {
  label: "",
  disabled: false,
  selected: false,
  name: "",
};

export const typesInputs = {
  input: "input",
  select: "select",
  upload: "upload",
  checkbox: "checkbox",
};

export const flowsFormHelpCenter = {
  gradesClarificationForm: {
    arrowBack: { ...arrowBack },
    title: "Pide una aclaración en tus calificaciones",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
  academicRegistrationSubjectsForm: {
    arrowBack: { ...arrowBack },
    title: "Ayuda con la inscripción de mis materias",
  },
  doubtsFormOnlineClasses: {
    arrowBack: { ...arrowBack },
    title: "Dudas con mis clases en línea",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
  extensionRequestForm: {
    arrowBack: { ...arrowBack },
    title: "Solicita una prórroga para entregar tus trabajos",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
  supportSchoolForm: {
    arrowBack: { ...arrowBack },
    title: "Apoyo para solicitar o dar seguimiento a un servicio escolar",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
  academicActivitiesHelpForm: {
    arrowBack: { ...arrowBack },
    title: "Apoyo con las instrucciones de mis actividades",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
  academicVirtualContentForm: {
    arrowBack: { ...arrowBack },
    title: "Reporta un problema con los contenidos cargados en tu aula virtual",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
  academicProfessorsFeedbackForm: {
    arrowBack: { ...arrowBack },
    title: "Da retroalimentación sobre profesores",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
  paymentHelpClarification: {
    arrowBack: { ...arrowBack },
    title: "Pide una aclaración respecto a tus pagos",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
  technicalHelpLibraryAndCollections: {
    arrowBack: { ...arrowBack },
    title: "Apoyo con el uso de la biblioteca y las colecciones bibliográficas",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
  otherAreasForm: {
    arrowBack: { ...arrowBack },
    title: "Solicita atención de otras áreas",
    forms: {
      descripcion: {
        ...InputInit,
      },
  },
},
  contactAnAdvisorForm: {
    arrowBack: { ...arrowBack },
    title: "Quiero contactar a mi asesor",
    forms: {
      descripcion: {
        ...InputInit,
      },
    },
  },
};

export const doubtsOnlineClassesForm = {
  checkboxes : [
    {
        ...checkboxInit,
        name: "grabación-no-disponible",
        label: "La grabación de mi clase en línea no está disponible",
    },
    {
        ...checkboxInit,
        name: "grabación-fallas-técnicas",
        label: "La grabación de mi clase en línea presenta fallas técnicas",
    },
    {
        ...checkboxInit,
        name: "clase-fallas-técnicas",
        label: "Mi clase en línea tuvo fallas técnicas",
    },
    {
        ...checkboxInit,
        name: "clase-reprogramó",
        label: "Mi clase en línea se reprogramó",
    },
 ],
  assignmentInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Materia",
      name: "assignment",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo materia es obligatorio",
  },
  professorInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Profesor",
      name: "professor",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo profesor es obligatorio",
  },
  classDateInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Fecha de la clase (DD/MM/YYYY)",
      name: "classDate",
      type: "text",
      alphanumeric: false,
      alphabetical: false,
      mask: '00/00/0000'
    },
    errorMessage: "El campo fecha es obligatorio",
  },
  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
    errorMessage: "El campo descripción es obligatorio",
  },
 uploadDoubtsOnlineClasses : {
    title: "Adjuntar documentos / imagenes",
    extensions: ".jpg, .png, .doc, .docx, .pdf",
    disabled: false,
    errorMessage: "Error al cargar el archivo",
  }
};

export const extensionRequestForm = {
  checkboxes : [
    {
        ...checkboxInit,
        name: "problema-salud",
        label: "Tuve un Problema de Salud",
    },
    {
        ...checkboxInit,
        name: "problema-familiar",
        label: "Tuve un Problema Familiar",
    },
 ],
  assignmentInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Materia",
      name: "assignment",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo  materia es obligatorio",
  },
  professorInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Profesor",
      name: "professor",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo profesor es obligatorio",
  },
  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
    errorMessage: "El campo descripción es obligatorio",
  },
 uploadExtensionRequest : {
    title: "Adjuntar documentos / imagenes",
    extensions: ".jpg, .png, .doc, .docx, .pdf",
    disabled: false,
    errorMessage: "Error al cargar el archivo",
  }
};

export const gradesClarificationForm = {
  checkboxes : [
    {
        ...checkboxInit,
        name: "no-calificaión-entregable",
        label: "No tengo calificación en mi entregable",
    },
    {
        ...checkboxInit,
        name: "no-calificaión-cuestionario",
        label: "No tengo calificación en mi cuestionario",
    },
    {
        ...checkboxInit,
        name: "no-calificaión-materia",
        label: "No tengo calificación en mi materia",
    },
    {
        ...checkboxInit,
        name: "desacuerdo-calificaión-entregable",
        label: "No estoy de acuerdo con la calificación de mi entregable",
    },
    {
        ...checkboxInit,
        name: "desacuerdo-calificaión-cuestionario",
        label: "No estoy de acuerdo con la calificación de mi cuestionario",
    },
    {
        ...checkboxInit,
        name: "desacuerdo-calificaión-materia",
        label: "No estoy de acuerdo con la calificación de mi materia",
    },
 ],
  assignmentInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Materia",
      name: "assignment",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo materia es obligatorio",
  },
  professorInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Profesor",
      name: "professor",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo profesor es obligatorio",
  },
  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
    errorMessage: "El campo descripción es obligatorio",
  },
 uploadGradesClarification : {
    title: "Adjuntar documentos / imagenes",
    extensions: ".jpg, .png, .doc, .docx, .pdf",
    disabled: false,
    errorMessage: "Error al cargar el archivo",
  }
};

export const supportSchoolForm = {

  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
    errorMessage: "El campo descripción es obligatorio",
  },
};

export const otherAreasForm = {
  checkboxes : [
    {
        ...checkboxInit,
        name: "no-calificaión-entregable",
        label: "Coordinación académica",
    },
    {
        ...checkboxInit,
        name: "no-calificaión-cuestionario",
        label: "Coordinación de desarrollo",
    },
    {
        ...checkboxInit,
        name: "no-calificaión-materia",
        label: "Recepcionista",
    },
    {
        ...checkboxInit,
        name: "desacuerdo-calificaión-entregable",
        label: "Cobranza",
    },
    {
        ...checkboxInit,
        name: "desacuerdo-calificaión-cuestionario",
        label: "Administración",
    },
 ],
  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
    errorMessage: "El campo descripción es obligatorio",
  },
};

export const contactAnAdvisorForm = {
  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
    errorMessage: "El campo descripción es obligatorio",
  },
};

export const cardProfileForm = {
  image: "",
  name: "Susana Hernandez Perez",
  items: [
    "55-2334-5678",
    "Campus Online",
    "Licenciatura en ingeniería",
    "Dato anexo 1",
  ],
  disabled: false,
};

const selectInit = {
  textDefault: "Option Default",
  disabled: false,
  reset: false,
  isLabel: true,
};

const buttonInit = {
  type: "primary",
  title: "",
  size: "small",
  icon: "",
  lyIcon: false,
  disabled: false,
  isExpand: true,
};

export const btnCancelHelpCenter = {
  ...buttonInit,
  title: "Cancelar",
  type: "text",
  size: "small",
  isExpand: true,
};

export const btnSendHelpCenter = {
  ...buttonInit,
  title: "Enviar",
  type: "outlined",
  size: "small",
  isExpand: true,
};

export const academicActivitiesForm = { 
  checkboxes: [
    {
      ...checkboxInit,
      name: "preguntas-no-claras",
      label: "Las preguntas del cuestionario y/o examen no son claras",
    },
    {
      ...checkboxInit,
      name: "redaccion-no-clara",
      label: "La redacción de las instrucciones no son claras",
    },
  ],
  assignmentInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Materia",
      name: "assignment",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo materia es obligatorio",
  },
  professorInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Profesor",
      name: "professor",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo profesor es obligatorio",
  },
  activitysInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Actividad",
      name: "activity",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo actividad es obligatorio",
  },
  academicWeekSelect: {
    typeCmp: typesInputs.select,
    name: "selectAcademicWeek",
    data: {
      ...selectInit,
      textDefault: "*Semana academica",
    },
  },
  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
  },
 uploadAcademicActivities : {
    title: "Adjuntar documentos / imagenes",
    extensions: ".jpg, .png, .doc, .docx, .pdf",
    disabled: false,
  }
  
};
export const academicVirtualContentForm = {
  assignmentInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Materia",
      name: "assignment",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo materia es obligatorio",
  },
  reportedAssignmentInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Material a reportar",
      name: "reportedAssignment",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El material a reportar es obligatorio",
  },
  activitysInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Actividad a reportar",
      name: "activity",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo actividad a reportar es obligatorio",
  },
  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
  },
 uploadAcademicActivities : {
    title: "Adjuntar documentos / imagenes",
    extensions: ".jpg, .png, .doc, .docx, .pdf",
    disabled: false,
  }
  
};
export const academicProfessorsFeedbackForm = {
  assignmentInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Materia",
      name: "assignment",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El campo materia es obligatorio",
  },
  professorInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Profesor",
      name: "professor",
      type: "text",
      alphabetical: true,
    },
    errorMessage: "El profesor es obligatorio",
  },
  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
  },
};

export const financialPaymentClarificationForm = {
  descriptionInput: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      name: "description",
      type: "textarea",
      label: "*Descripción del caso",
    },
  },
  uploadInput : {
    title: "Adjuntar documentos / imagenes",
    extensions: ".jpg, .png, .doc, .docx, .pdf",
    disabled: false,
  }
};

export const nextBtnAcademicActivities = {
  ...buttonInit,
  title: "Enviar",
  type: "outlined",
  isExpand: true,
};

export const cancelBtnAcademicActivities = {
  ...buttonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};



export const maxSizeFileInAcademicActivities = 2000000;
export const maxSizeFileInVirtualContent = 2000000;
export const maxSizeFinancialPaymentClarification = 2000000;
export const maxSizeFileHelpCenter = 2000000;
export const maxFileSizeErrorOneMgb = 'No se puede agregar archivos mayores a 2MB'


export const academicRegistrationSubjectsForm = {
  paymentDate: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Fecha de pago(DD/MM/YYYY)",
      name: "paymentDate",
      type: "text",
      mask: "00/00/0000"
    }
  },
  paymentMount: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Monto de pago",
      name: "paymentMount",
      type: "text",
      alphanumeric: false,
      alphabetical: false,
      onlyNumbers: true,
    }
  },
  paymentMethod: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Medio de pago",
      name: "paymentMethod",
      type: "text",
    }
  },
  caseDescription: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Descripción del caso",
      name: "description",
      type: "textarea",
    }
  },
  uploadInput : {
    title: "Adjuntar documentos / imagenes",
    extensions: ".jpg, .png, .doc, .docx, .pdf",
    disabled: false,
  }
}

export const technicalHelpLibraryAndCollections = {
  subject: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Materia",
      name: "subject",
      type: "text",
    }
  },
  teacher: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Profesor",
      name: "teacher",
      type: "text",
    }
  },
  activity: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "*Actividad",
      name: "activity",
      type: "text",
    }
  },
  description: {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: "Descripción del caso",
      name: "description",
      type: "textarea",
    }
  },
  uploadInput : {
    title: "Adjuntar documentos / imagenes",
    extensions: ".jpg, .png, .doc, .docx, .pdf",
    disabled: false,
  }
}

export const selectAdesAcademicHelp = {
  ...selectInit,
  name: 'selectAdesRequest',
  textDefault: "Selecciona a tu asesor*",
};

export const selectAdescHelp = {
  ...selectInit,
  name: 'selectAdesRequest',
  textDefault: "*Selecciona a tu asesor",
};

export const selectAdesFinancialHelp = {
  ...selectInit,
  name: 'selectAdesRequest',
  textDefault: "Selecciona a tu asesor*",
};
