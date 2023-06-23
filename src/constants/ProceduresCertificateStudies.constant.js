import { listStyle } from "./Accordion.constant";

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

export const inputCertificatestudyNum = {
  ...InputInit,
  data: {
    ...InputInit.data,
    maxlength: "10",
    type: "text",
    onlyNumbers: true,
    label: 'Teléfono',
    name: "phone"
  },
  value: "5566778844",
  errorMessage: 'Se necesitan 10 caracteres numéricos'
};

export const selectTypeCertificateStudy = {
  ...selectInit,
  name: 'selectTypeCertificate',
  textDefault: "*Tipo de certificado",
};

export const selectRequestCertificateStudy = {
  ...selectInit,
  name: 'selectCertificateRequest',
  textDefault: "*Tipo de solicitud de certificado",
};

export const selectTypeDeliveryCertificateStudy = {
  ...selectInit,
  name: 'selectTypeDelivery',
  textDefault: "*Tipo de entrega",
};

export const selectCampusDeliveryCertificateStudy = {
  ...selectInit,
  textDefault: "*Campus de entrega",
  name: "selectCampusDelivery",
};


export const textareaCertificateStudy = {
  ...InputInit,
  data: {
    ...InputInit.data,
    type: "textarea",
    label: "Comentarios",
    name: "comments",
  },
};

export const cancelBtnCertificateStudy = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnCertificateStudy = {
  ...ButtonInit,
  title: "Continuar",
  type: "outlined",
  isExpand: true,
};

export const backBtnCertificateStudy = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const requestBtnCertificateStudy = {
  ...ButtonInit,
  title: "Solicitar",
  type: "outlined",
  isExpand: true,
};

export const uploadCertificateStudy = {
  title: "Selecciona el archivo",
  extensions: ".jpg, .png, .doc, .docx, .pdf",
  disabled: false,
  id: 'certificateStudy'
};

export const feedbackNoticeCertificateStudy = {
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

export const maxSizeFileInCertificateStudy = 2000000;

export const accordionItemsCertificate = {
  items: [
    {
      title:'Certificado de estudios',
      iconArrow: 'expand_more',
      content:`<ul ${listStyle.ul}> <li ${listStyle.li}>Cubrir el 100% de créditos de las asignaturas cursadas</li> <li ${listStyle.li}> Imprime, revisa y firma el historial académico, agregando tu nombre completo (Agregando acentos si lo requiere).</li><li ${listStyle.li}> Coloca la siguiente leyenda en el historial académico “Estoy de acuerdo con los datos acentados en este documento”</li> <li ${listStyle.li}>Integralo en el ticket.</li> </ul>`,
      id: '1',
    },
    {
      title: 'Certificado parcial de estudios',
      iconArrow: 'expand_more',
      content:`<ul ${listStyle.ul}><li ${listStyle.li}>Se realizará con el avance de créditos de las asignaturas cursadas</li> <li ${listStyle.li}> Imprime, revisa y firma el historial académico, agregando tu nombre completo (Agregando acentos si los requiere)</li> <li ${listStyle.li}>Coloca la siguiente leyenda en el historial académico:</li> <li ${listStyle.li}>“Estoy de acuerdo con los datos acentados en este documento”</li><li ${listStyle.li}>Integralo en el ticket</li></ul>`,
      id: '2',
    },
  ],
};

