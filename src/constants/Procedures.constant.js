import { texts } from "../texts/indexText";
import env from "../enviroment/environment"


export const breadcrumb = {
  textItems: [
    {
      value: "/",
      text: "Home",
    },
    {
      value: "/procedures",
      text: "Trámites",
    },
  ],
  icon: "home",
};

export const cardProfileProcedures = {
  image: "",
  name: "",
  items: [],
  disabled: false,
};

export const breadcrumbInfo = {
  // iconColor: "#e14504",
  // itemFocusColor: "#e14504",
  textItems: [
    {
      value: "/",
      text: "Home",
    },
    {
      value: "/procedures/main",
      text: "Trámites",
    },
    {
      value: "/procedure",
      text: "",
    },
  ],
  icon: "arrow_back",
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

export const btnCalendar = {
  ...ButtonInit,
  variant: "outlined",
  size: "sm",
  label: texts.procedures.btnCalendar,
  className: "w-full border-primary-500 text-primary-500 focus:border-primary-500 focus:ring-primary-500 tracking-widest"
};

export const btnConsult = {
  ...ButtonInit,
  variant: "primary",
  size: "sm",
  label: texts.procedures.btnConsult,
  className: "w-full bg-primary-500 border-primary-500 hover:bg-primary-600 tracking-widest"
};
export const btnInfoProcedures = {
  ...ButtonInit,
  type: "outlined",
  title: texts.procedures.btnInfoCertificateStudy,
};

export const btnInfoProceduresDownload = {
  ...ButtonInit,
  type: "outlined",
  icon: "download",
  title: texts.procedures.btnInfoScholarshipDownload,
};

export const btnDownloadCertificateStudy = {
  ...ButtonInit,
  type: "outlined",
  icon: "download",
  title: texts.procedures.btnDownloadCertificateStudy,
};

export const feedbackInfoProcedures = {
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

export const cardsIcon = [
  // {
  //   path: "/procedures-flows/credential/information",
  //   icon: "book",
  //   title: "Credencial física",
  //   disabled: false,
  //   isContent: true,
  //   content: {
  //     text: "La credencial es un instrumento de identificación por lo que es de suma importancia que siempre cuentes con ella. Si la extraviaste o necesitas renovarla, este es el lugar.",
  //     price: 120,
  //   },
  // },
  {
    path: "/procedures-flows/study-record/information",
    icon: "description",
    title: "Constancia de estudio",
    disabled: false,
    isContent: true,
    content: {
      text: "Documento con el que cada estudiante puede acreditar toda su trayectoria académica. En dicho documento se certifica oficialmente los estudios que una persona ha cursado con éxito.",
      price: 120,
    },
  },
  {
    path: "/procedures-flows/certificate-study/information",
    icon: "star",
    title: "Certificado de estudios",
    disabled: false,
    isContent: true,
    content: {
      text: "Documento donde se declara oficialmente que haz acreditado tu plan de estudios, este puede ser completo o parcial, incluye fechas, calificaciones, nombre de las unidades de aprendizaje, sellos y firmas de autoridades.",
      price: 1500,
    },
  },
  {
    path: "/procedures-flows/academic-history/information",
    icon: "event_available",
    title: "Historial académico sellado",
    disabled: false,
    isContent: true,
    content: {
      text: "Documento que muestra todas las asignaturas del plan de estudios correspondiente y la calificación obtenida en cada asignatura cursada. Informa el total de créditos aprobados, así como el porcentaje de avance acumulado.",
      price: 120,
    },
  },
  {
    path: "/procedures-flows/equivalence-study/information",
    icon: "search",
    title: "Equivalencia de estudios",
    disabled: false,
    isContent: true,
    content: {
      text: "Es el documento que se expide de una modalidad educativa a otra, que facilita el tránsito de educandos permitiendote poder ingresar a la universidad con antecedentes de otras instituciones.",
      price: 1900,
    },
  },
  {
    path: "/procedures-flows/reinstatement/information",
    icon: "grading",
    title: "Reincorporación",
    disabled: false,
    isContent: true,
    content: {
      text: "Trámite mediante el cual la universidad otorga validez oficial a estudios realizados en el extranjero, siempre y cuando sean equiparables con estudios que se impartan en el Sistema Educativo Nacional.",
      price: 1900,
    },
  },
  {
    path: "/procedures-flows/scholarship/information",
    icon: "request_quote",
    title: "Becas",
    disabled: false,
    isContent: true,
    content: {
      text: "Descarga aquí el formato de beca, completa tus datos, firma, escanea y súbela para iniciar tu trámite de solicitud. Una vez enviado deberás esperar la evaluación de tu solicitud para recibir una respuesta. ",
      price: "Sin costo",
    },
  },
  {
    path: "/procedures-flows/revalidate-study/information",
    icon: "request_quote",
    title: "Revalidación de estudios",
    disabled: false,
    isContent: true,
    content: {
      text: "¿Estudiaste algo relacionado con tu programa actual en una universidad extranjera? Solicita una Revalidación para acreditar las asignaturas con contenidos similares que ya cursaste.",
      price: 1900,
    },
  },
  {
    path: "/procedures-flows/admission-certificate/information",
    icon: "portrait",
    title: "Acta de admisión",
    disabled: false,
    isContent: true,
    content: {
      text: "Solicita este documento una vez que tengas el dictamen de revalidación como reconocimiento de tus  estudios cursados en el extranjero, para completar tu inscripción a la ULA.",
      price: 500,
    },
  },
  {
    path: "/procedures-flows/program-change/information",
    icon: "portrait",
    title: "Cambio de programa",
    disabled: false,
    isContent: true,
    content: {
      text: "¿Te interesa cambiar de carrera? Solicita un cambio descargando el formato, llénaló con tus datos y súbelo; Deberas realizar el pago del trámite y esperar la respuesta de control escolar.",
      price: 500,
    },
  },
  {
    icon: "portrait",
    title: "Revisión de historial académico",
    disabled: false,
    isContent: true,
    content: {
      text: "Documento de consulta no oficial que muestra todas las asignaturas del plan de estudios y la calificación obtenida en cada asignatura que has cursado. Informa el total de créditos aprobados, así como tú porcentaje de avance acumulado.",
      price: "Sin costo",
    }, 
  },

  // {
  //   icon: "military_tech",
  //   title: "Servicio social",
  //   disabled: false,
  //   isContent: true,
  //   content: {
  //     text: "Actividad profesional a través de cuya práctica, el universitario participa en la sociedad, identificando problemáticas y coadyuvando a su solución.",
  //     price: 450,
  //   },
  // },
];

export const stepsProcedures = {
  focus: 0,
  titles: [
    {
      text: "Información",
      disabled: false,
    },
    {
      text: "Documentación",
      disabled: false,
    },
  ],
  off: false,
};

export const stepsProceduresRevalidate = {
  focus: 0,
  titles: [
    {
      text: "Información",
      disabled: false,
    },
    {
      text: "Escuela de procedencia",
      disabled: false,
    },
    {
      text: "Documentación",
      disabled: false,
    },
  ],
  off: false,
};

export const urlProceduresFlow = {
  url: "procedures-flows",
};

export const typeflowsProcedures = {
  academyHistory: "academic-history",
  studyRecord: "study-record",
  certificateStudy: "certificate-study",
  equivalenceStudy: "equivalence-study",
  credential: "credential",
  reinstatement: "reinstatement",
  socialService: "servicioSocial",
  degree: "titulacion",
  degreeInProgress: "degreeInProgress",
  degreeInProgressTradicional: "degreeInProgress",
  degreeGraduate: "degreeGraduate",
  elderOrIllSocialService: "elder-or-ill-social-service",
  ulaInstitutionSocialService: "ula-institution-social-service",
  registerProgramorInstitute: "register-program-or-institute-social-service",
  governmentEmployee: "government-employee",
  scholarship: "scholarship",
  admissionCertificate: "admission-certificate",
  revalidateStudy: "revalidate-study",
  reviewAcademicHistory: "review-academic-history",
  programChange: "program-change"
};

export const typeStagesProcedures = {
  information: "information",
  documents: "documents",
  data: "data"
};

export const informationAcademicHistory = {
  title: texts.procedures.academicHistory.title,
  text: texts.procedures.academicHistory.text,
  price: texts.procedures.academicHistory.price,
};

export const informationStudyRecord = {
  title: texts.procedures.studyRecord.title,
  text: texts.procedures.studyRecord.text,
  price: texts.procedures.studyRecord.price,
};

export const informationCertificateStudy = {
  title: texts.procedures.certificateStudy.title,
  text: texts.procedures.certificateStudy.text,
  price: texts.procedures.certificateStudy.price,
};

export const informationEquivalenceStusy = {
  title: texts?.procedures?.equivalenceStudy.title,
  text: texts?.procedures?.equivalenceStudy.text,
  price: texts?.procedures?.equivalenceStudy.price,
};

export const informationReinstatement = {
  title: texts.procedures.reinstatement.title,
  text: texts.procedures.reinstatement.text,
  price: texts.procedures.reinstatement.price,
};

export const informationRevalidate = {
  title: texts.procedures.revalidateStudy.title,
  text: texts.procedures.revalidateStudy.text,
  price: texts.procedures.revalidateStudy.price,
};

export const constantsModal = [
  {
    title: texts.procedures.constantsModalBtnCredits.title,
    text: texts.procedures.constantsModalBtnCredits.text,
    image: texts.procedures.constantsModalBtnCredits.image,
  },
  {
    title: texts.procedures.constantsModalBtnSedena.title,
    text: texts.procedures.constantsModalBtnSedena.text,
    image: texts.procedures.constantsModalBtnSedena.image,
  },
];

export const constantsModalBtn = {
  ...ButtonInit,
  title: "Descargar demo",
};

export const feedbackPaySolicitude = {
  left: {
    name: "check_circle_outline",
    status: "success",
  },
  right: {
    name: "close",
  },
  type: "modal",
  isTextEvent: false,
  textEvent: "Dismiss",
};

export const feedbackPaySolicitudeError = {
  left: {
    name: "report",
    status: "error",
  },
  right: {
    name: "close",
  },
  type: "modal",
  isTextEvent: false,
  textEvent: "Dismiss",
};

export const btnSolicitude = {
  ...ButtonInit,
  title: "Pagar",
  type: "negative",
};

export const btnSolicitudeError = {
  ...ButtonInit,
  title: "Aceptar",
  type: "negative",
};

export const feedbackProcedures = {
  left: {
    name: "info",
    status: "normal",
  },
  type: "alert",
  isTextEvent: false,
  textEvent: "Dismiss",
};

export const breadcrumbCalendar = {
  // iconColor: "#e14504",
  // itemFocusColor: "#e14504",
  textItems: [
    {
      value: "/",
      text: "Home",
    },
    {
      value: "/procedures-main",
      text: "Trámites",
    },
    {
      value: "/procedures",
      text: "Calendario escolar",
    },
  ],
  icon: "arrow_back",
};

export const downloadCalendar = {
  ...ButtonInit,
  label: "Descargar",
  size: "sm",
  variant: "outlined",
  className: "w-full border-primary-500 text-primary-500 focus:border-primary-500 focus:ring-primary-500 tracking-widest"
};

export const procedureCalendar = {
  image: "images/Procedures/calendar.png",
};

const getTypeDelivaryProcedures = () => {
  return {
    fisico: "ENTE7E2C6",
    digital: "ENTU10E2F7D7",
  };
};

export const typesDelivaryProcedures = {
  fisico: getTypeDelivaryProcedures().fisico,
  digital: getTypeDelivaryProcedures().digital,
};

export const buttonEmptyProcedures = {
  ...ButtonInit,
  title: "Regresar",
  isExpand: false,
  type: "primary",
};

export const typeRequestStatus = {
  new: "Nuevo",
  pedding: "En Progreso",
  close: "Cerrado",
};

export const typesStepsDegreeModal = {
  online: "1",
  graduate: "2",
};

export const selectTypeSocialServiceProcedures = [
  {
    id: typeflowsProcedures.ulaInstitutionSocialService,
    urlImage: "https://www.studyinjapan.go.jp/en/_mt/2020/05/kv_04.jpg",
    text: "Programa o Institución de la ULA",
    icon: "arrow_forward",
    color: "rgba(255, 125, 0, 0.5)",
    opacity: "multiply",
    height: "150px",
  },
  {
    id: typeflowsProcedures.elderOrIllSocialService,
    urlImage: "https://www.studyinjapan.go.jp/en/_mt/2020/05/kv_04.jpg",
    text: "Adulto mayor o enfermedad grave",
    icon: "arrow_forward",
    color: "rgba(255, 125, 0, 0.5)",
    opacity: "multiply",
    height: "150px",
  },
  {
    id: typeflowsProcedures.registerProgramorInstitute,
    urlImage: "https://www.studyinjapan.go.jp/en/_mt/2020/05/kv_04.jpg",
    text: "Registra un programa o institución.",
    icon: "arrow_forward",
    color: "rgba(255, 125, 0, 0.5)",
    opacity: "multiply",
    height: "150px",
  },
  {
    id: typeflowsProcedures.governmentEmployee,
    urlImage: "https://www.studyinjapan.go.jp/en/_mt/2020/05/kv_04.jpg",
    text: "Soy empleado de gobierno.",
    icon: "arrow_forward",
    color: "rgba(255, 125, 0, 0.5)",
    opacity: "multiply",
    height: "150px",
  },
];
export const selectTypeDegreeProcedures = [
  {
    id: typeflowsProcedures.degreeInProgress,
    urlImage: "https://www.studyinjapan.go.jp/en/_mt/2020/05/kv_04.jpg",
    text: "Cursando",
    icon: "arrow_forward",
    color: "rgba(255, 125, 0, 0.5)",
    opacity: "multiply",
    height: "150px",
  },
  {
    id: typeflowsProcedures.degreeGraduate,
    urlImage: "https://www.studyinjapan.go.jp/en/_mt/2020/05/kv_04.jpg",
    text: "Egresado",
    icon: "arrow_forward",
    color: "rgba(255, 125, 0, 0.5)",
    opacity: "multiply",
    height: "150px",
  },
];

export const DownloadInformationActionableCatalog = {
  [typeflowsProcedures.reinstatement] : [
  {
    name: "formato-reincorporación.docx",
    path:  `${env.contentAssets}docs/Reicorporacion/formato-reincorporación.docx`,
    successMsg: texts.procedures.downloadPDFSuccessReinstatement,
    errorMsg: texts.procedures.downloadPDFErrorReinstatement,
  }
  ],
  [typeflowsProcedures.admissionCertificate] : [
    {
    name: "formato-acta-admision.pdf",
    path: `${env.contentAssets}docs/acta-admision/ula/formato-acta-admision.pdf`,
    successMsg: texts.procedures.downloadPDFSuccess,
    errorMsg: texts.procedures.downloadPDFError,
    },
    {
    name: "ejemplo-acta-admision.pdf",
    path: `${env.contentAssets}docs/acta-admision/ula/ejemplo-acta-admision.pdf`,    
    successMsg: texts.procedures.downloadPDFSuccess,
    errorMsg: texts.procedures.downloadPDFError,
    }
  ],  
  [typeflowsProcedures.scholarship] : [
    {
    name: "solicitud-beca.pdf",
    path: `${env.contentAssets}docs/becas-ula/solicitud-beca.pdf`,
    successMsg: texts.procedures.downloadPDFSuccessReinstatement,
    errorMsg: texts.procedures.downloadPDFErrorReinstatement,
    }
  ],
  [typeflowsProcedures.programChange] : [
    {
    name: "solicitud-cambio.pdf",
    path:  `${env.contentAssets}docs/cambio-programa/ula/solicitud-cambio.pdf`,
    successMsg: texts.procedures.downloadPDFSuccess,
    errorMsg: texts.procedures.downloadPDFError,
    }
  ],    
  [typeflowsProcedures.revalidateStudy] : [
    {
    name: "requisitos-revalidación.pdf",
    path: `${env.contentAssets}docs/requisitos-revalidacion/ula/guia-requisitos-revalidacion.pdf`,
    successMsg: texts.procedures.downloadPDFSuccess,
    errorMsg: texts.procedures.downloadPDFError,
    }
  ],  
  [typeflowsProcedures.governmentEmployee] : [
    {
    name: "guia-requisitos-servicio-social.pdf",
    path: `${env.contentAssets}docs/requisitos-servicio-social/guia-requisitos-servicio-social.pdf`,
    successMsg: texts.procedures.downloadPDFSuccess,
    errorMsg: texts.procedures.downloadPDFError,
    }
  ],  
  [typeflowsProcedures.ulaInstitutionSocialService] : [
    {
    name: "guia-requisitos-servicio-social.pdf",
    path: `${env.contentAssets}docs/requisitos-servicio-social/guia-requisitos-servicio-social.pdf`,
    successMsg: texts.procedures.downloadPDFSuccess,
    errorMsg: texts.procedures.downloadPDFError,
    }
  ],
  [typeflowsProcedures.registerProgramorInstitute] : [
    {
    name: "guia-requisitos-servicio-social.pdf",
    path: `${env.contentAssets}docs/requisitos-servicio-social/guia-requisitos-servicio-social.pdf`,
    successMsg: texts.procedures.downloadPDFSuccess,
    errorMsg: texts.procedures.downloadPDFError,
    }
  ],
  [typeflowsProcedures.elderOrIllSocialService] : [
    {
    name: "guia-requisitos-servicio-social.pdf",
    path: `${env.contentAssets}docs/requisitos-servicio-social/guia-requisitos-servicio-social.pdf`,
    successMsg: texts.procedures.downloadPDFSuccess,
    errorMsg: texts.procedures.downloadPDFError,
    }
  ],
}

export const FeedbackInformationActionableCatalog = {
  [typeflowsProcedures.scholarship] : [{
    description: texts.procedures.feedbackInfoScholarship,
  }],
}
  

export const ProceduresActionables = [
  'modal', 'download', 'feedback'
]

