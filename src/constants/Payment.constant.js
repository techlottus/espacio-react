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
    maxlength: "50",
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
  icon: "person",
  reset: false,
  isLabel: true,
};

export const stepper = {
  focus: 0,
  titles: [
    {
      text: texts?.payment.stepper.titleOne,
      disabled: false,
    },
    {
      text: texts?.payment.stepper.titleTwo,
      disabled: false,
    },
    {
      text: texts?.payment.stepper.titleThree,
      disabled: false,
    },
  ],
  off: false,
};

export const breadcrumb = {
  iconColor: "#e14504",
  itemFocusColor: "#e14504",
  textItems: [
    {
      value: "/",
      text: texts?.payment.breadcrumb.breadOne,
    },
    {
      value: "/payment",
      text: texts?.payment.breadcrumb.breadTwo,
    },
  ],
  icon: texts?.payment.breadcrumb.icon,
};

export const cardDetail = {
  id: "123",
  title: "Hola Mundo",
  description:
    "Revisa el camino que haz tenido en la universida, calificaciones y materias que llevaste",
  price: 390,
  action: "Eliminar",
  checked: false,
};

export const cardDetails = [
  {
    ...cardDetail,
    title: "Licenciatura en diseño gráfico Agoso",
    id: "123",
  },
  {
    ...cardDetail,
    title: "Credencial",
    id: "456",
  },
  {
    ...cardDetail,
    title: "Certificado de estudios",
    id: "789",
  },
];

export const conceptToogle = {
  size: "small",
  status: false,
  disabled: false,
};

export const paymentResumeNextBtn = {
  ...ButtonInit,
  isExpand: false,
  title: texts?.payment?.resume.next,
  type: "primary",
};

export const paymentBtnResume = {
  ...ButtonInit,
  isExpand: false,
  title: texts?.payment?.resume.payment,
  type: "primary",
  disabled: true,
};

export const typesPerson = {
  fisica: "1",
  moral: "2",
};

export const tabsTax = {
  size: "small",
  items: [
    {
      icon: "",
      title: texts?.payment.invoiceType.one,
      id: typesPerson.fisica,
      disabled: false,
    },
    {
      icon: "",
      title: texts?.payment.invoiceType.two,
      id: typesPerson.moral,
      disabled: false,
    },
  ],
  focus: typesPerson.fisica,
};

export const backBtn = {
  ...ButtonInit,
  title: texts?.payment.btns.back,
  type: "text",
  isExpand: true,
};

export const cancelBtn = {
  ...ButtonInit,
  title: texts?.payment.btnModal.cancel,
  type: "text",
  isExpand: true,
};

export const saveBtn = {
  ...ButtonInit,
  title: texts?.payment.btnModal.save,
  type: "outlined",
  isExpand: true,
};

export const nextBtn = {
  ...ButtonInit,
  title: texts?.payment.btnModal.next,
  type: "primary",
  isExpand: false,
};

export const typesInputs = {
  input: "input",
  select: "select",
};

export const optionsStates = [
  {
    value: "01",
    active: false,
    text: "AGUASCALIENTES",
  },
  {
    value: "02",
    active: false,
    text: "BAJA CALIFORNIA",
  },
  {
    value: "03",
    active: false,
    text: "BAJA CALIFORNIA SUR",
  },
  {
    value: "04",
    active: false,
    text: "CAMPECHE",
  },
  {
    value: "05",
    active: false,
    text: "COAHUILA DE ZARAGOZA",
  },
  {
    value: "06",
    active: false,
    text: "COLIMA",
  },
  {
    value: "07",
    active: false,
    text: "CHIAPAS",
  },
  {
    value: "08",
    active: false,
    text: "CHIHUAHUA",
  },
  {
    value: "09",
    active: false,
    text: "DISTRITO FEDERAL",
  },
  {
    value: "10",
    active: false,
    text: "DURANGO",
  },
  {
    value: "11",
    active: false,
    text: "GUANAJUATO",
  },
  {
    value: "12",
    active: false,
    text: "GUERRERO",
  },
  {
    value: "13",
    active: false,
    text: "HIDALGO",
  },
  {
    value: "14",
    active: false,
    text: "JALISCO",
  },
  {
    value: "15",
    active: false,
    text: "ESTADO DE MEXICO",
  },
  {
    value: "16",
    active: false,
    text: "MICHOACAN",
  },
  {
    value: "17",
    active: false,
    text: "MORELOS",
  },
  {
    value: "18",
    active: false,
    text: "NAYARIT",
  },
  {
    value: "19",
    active: false,
    text: "NUEVO LEON",
  },
  {
    value: "20",
    active: false,
    text: "OAXACA",
  },
  {
    value: "21",
    active: false,
    text: "PUEBLA",
  },
  {
    value: "22",
    active: false,
    text: "QUERÉTARO",
  },
  {
    value: "23",
    active: false,
    text: "QUINTANA ROO",
  },
  {
    value: "24",
    active: false,
    text: "SAN LUIS POTOSÍ",
  },
  {
    value: "25",
    active: false,
    text: "SINALOA",
  },
  {
    value: "26",
    active: false,
    text: "SONORA",
  },
  {
    value: "27",
    active: false,
    text: "TABASCO",
  },
  {
    value: "28",
    active: false,
    text: "TAMAULIPAS",
  },
  {
    value: "29",
    active: false,
    text: "TLAXCALA",
  },
  {
    value: "30",
    active: false,
    text: "VERACRUZ",
  },
  {
    value: "31",
    active: false,
    text: "YUCATAN",
  },
  {
    value: "32",
    active: false,
    text: "ZACATECAS",
  },
  {
    value: "33",
    active: false,
    text: "EXTRANJERO",
  },
  {
    value: "00",
    active: false,
    text: "DESCONOCIDO",
  },
];

const selectState = {
  typeCmp: typesInputs.select,
  name: "state",
  data: {
    ...selectInit,
    icon: "place",
    textDefault: texts?.payment.forms.state.title,
  },
  options: [...optionsStates],
};

// const selectNeigh = {
//   typeCmp: typesInputs.select,
//   name: "neighborhood",
//   data: {
//     ...selectInit,
//     icon: "place",
//     textDefault: "Seleccione colonia",
//   },
//   options: null,
// };

const addressTax = [
  {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: texts?.payment.forms.zipCode.title,
      name: "zipCode",
      type: "text",
      maxlength: "5",
      alphabetical: false,
      onlyNumbers: true,
    },
    hasError: false,
    errorMessage: texts?.payment.forms.zipCode.error,
  },
  {
    ...selectState,
  },
  {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: texts?.payment.forms.city.title,
      name: "city",
      type: "text",
      alphabetical: true,
    },
    hasError: false,
    errorMessage: texts?.payment.forms.city.error,
  },
  {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: texts?.payment.forms.neighborhood.title,
      name: "neighborhood",
      type: "text",
      alphanumeric: true,
    },
    hasError: false,
    errorMessage: texts?.payment.forms.neighborhood.error,
  },
  {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: texts?.payment.forms.street.title,
      name: "street",
      type: "text",
      alphanumeric: true,
    },
    hasError: false,
    errorMessage: texts?.payment.forms.street.error,
  },
];

const rfcTax = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    label: texts?.payment.forms.rfc.title,
    name: "rfc",
    type: "text",
    alphanumeric: true,
    maxlength: "13",
    upperCase: true,
  },
  hasError: false,
  errorMessage: texts?.payment.forms.rfc.error,
};

const studentRfcTax = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    label: texts?.payment.forms.curp.title,
    name: "curp",
    type: "text",
    alphanumeric: true,
    upperCase: true,
    maxlength: "18",
  },
  hasError: false,
  errorMessage: texts?.payment.forms.curp.error,
};

const studentEmailTax = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    label: texts?.payment.forms.email.title,
    name: "email",
    type: "email",
  },
};

export const optionCfdi = [
  {
    value: "D10",
    text: texts?.payment.cfdiOptions.optionOne,
    active: false,
  },
  {
    value: "G03",
    text: texts?.payment.cfdiOptions.optionsTwo,
    active: false,
  },
];

const selectCfdi = {
  typeCmp: typesInputs.select,
  name: "cfdi",
  data: {
    ...selectInit,
    textDefault: texts?.payment?.forms?.cfdiUsage?.title,
  },
  options: [...optionCfdi],
};

const selectRegime = {
  typeCmp: typesInputs.select,
  name: "regime",
  data: {
    ...selectInit,
    textDefault: texts?.payment?.forms?.regime?.title,
  },
  options: [],
};

export const inputsFisicaTax = [
  {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: texts?.payment?.forms?.name?.title,
      name: "fullName",
      type: "text",
      alphabetical: true,
    },
    hasError: false,
    errorMessage: texts?.payment?.forms?.name?.error,
  },
  {
    ...rfcTax,
    data: { ...rfcTax.data, maxlength: "13" },
  },
  {
    ...selectCfdi,
  },
  {
    ...selectRegime,
  },
  {
    ...studentRfcTax,
  },
  ...addressTax,
  {
    ...studentEmailTax,
  },
];

export const inputsMoralTax = [
  {
    ...InputInit,
    typeCmp: typesInputs.input,
    data: {
      ...InputInit.data,
      label: texts?.payment?.forms?.businessName?.title,
      name: "businessName",
      type: "text",
      alphabetical: true,
      maxlength: "120",
    },
    hasError: false,
    errorMessage: texts?.payment?.forms?.businessName?.error,
  },
  {
    ...rfcTax,
    data: {
      ...rfcTax.data,
      maxlength: "12",
    },
  },
  {
    ...selectCfdi,
  },
  {
    ...selectRegime,
  },
  {
    ...studentRfcTax,
  },
  ...addressTax,
  {
    ...studentEmailTax,
  },
];

export const cardInvoice = {
  id: "123",
  title: "LAKU654378JU7",
  actions: ["delete", "edit"],
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.",
  checked: false,
};

export const listCardsInvoice = [
  {
    ...cardInvoice,
    id: "invoice-123",
  },
  {
    ...cardInvoice,
    id: "invoice-345",
    title: "GAVA8484848J9",
  },
];

export const listTaxLink = {
  text: texts?.payment.addInvoice,
  size: "medium",
  isBold: false,
  disabled: false,
  id: "link_add",
  icon: "add_circle_outline",
};

const paymentCard = {
  id: "123",
  title: "Ficha de depósito",
  icon: "home",
  label: "- Pago en efectivo",
  description: "",
  checked: false,
};

export const typesPaymentMethods = {
  mercadoPago: "mercado-pago",
  online: "pago-en-linea",
  deposit: "fecha-de-deposito",
};

export const paymentCardMethods = [
  {
    ...paymentCard,
    title: texts?.payment.paymentMethods[0].title,
    label: texts?.payment.paymentMethods[0].label,
    icon: texts?.payment.paymentMethods[0].icon,
    id: typesPaymentMethods.online,
    description: texts?.payment.paymentMethods[0].description,
  },
  {
    ...paymentCard,
    title: texts?.payment.paymentMethods[1].title,
    label: texts?.payment.paymentMethods[1].label,
    icon: texts?.payment.paymentMethods[1].icon,
    id: typesPaymentMethods.deposit,
    description: texts?.payment.paymentMethods[1].description,
  },
];

export const stagesSteps = {
  concept: 0,
  taxData: 1,
  methods: 2,
};

export const cardResume = {
  label: texts?.payment.cardResume.label,
  title: texts?.payment.cardResume.title,
  subtitle: texts?.payment.cardResume.subtitle,
  price: texts?.payment.cardResume.price,
  isTotal: false,
  totalTitle: texts?.payment.cardResume.totalTitle,
  totalUnit: texts?.payment.cardResume.totalUnit,
};

export const btnModalNext = {
  ...ButtonInit,
  title: texts?.payment.btnModal.next,
};

export const btnModalBack = {
  ...ButtonInit,
  type: "outlined",
  title: texts?.payment.btnModal.back,
};

export const btnModalNextInvoice = {
  ...ButtonInit,
  type: "outlined",
  title: texts?.payment.btnModal.next,
};

export const btnModalBackInvoice = {
  ...ButtonInit,
  type: "text",
  title: texts?.payment.btnModal.back,
};

export const btnModalNextExit = {
  ...ButtonInit,
  type: "outlined",
  title: texts?.general.modals.modalExit.exitBtn,
};

export const btnModalBackExit = {
  ...ButtonInit,
  type: "text",
  title: texts?.general.modals.modalExit.cancelBtn,
};

export const feedbackError = {
  left: {
    name: "info",
    status: "error",
  },
  right: {
    name: "close",
  },
  type: "modal",
  isTextEvent: false,
  textEvent: "Dismiss",
};

export const btnModalConceptDelete = {
  ...ButtonInit,
  type: "outlined",
  title: texts?.payment.btnModal.delete,
};

export const btnModalConceptCancel = {
  ...ButtonInit,
  type: "text",
  title: texts?.payment.btnModal.cancel,
};

export const btnModalToggleCancel = {
  ...ButtonInit,
  type: "text",
  title: texts?.payment.btnModal.cancel,
};

export const btnModalToggleAccept = {
  ...ButtonInit,
  type: "outlined",
  title: texts?.payment.btnModal.accept,
};

export const btnModalCardDelete = {
  ...ButtonInit,
  type: "outlined",
  title: texts?.payment.btnModal.delete,
};

export const btnModalCardCancel = {
  ...ButtonInit,
  type: "text",
  title: texts?.payment.btnModal.cancel,
};

export const feedbackAlertError = {
  left: {
    name: "info",
    status: "normal",
  },
  right: {
    name: "",
  },
  type: "alert",
  isTextEvent: false,
  textEvent: "Dismiss",
};

export const inputCreditCard = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    name: "creditNumber",
    label: "Número de tarjeta*",
    maxlength: 20,
    type: "text",
    onlyNumbers: false,
    mask: "0000 0000 0000 0000",
  },
  errorMessage: "Se necesitan 16 caracteres numéricos",
};
export const inputCreditCardName = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    name: "creditName",
    label: "Nombre de tarjeta*",
    type: "text",
    alphabetical: true,
  },
  errorMessage: "El campo de nombre de tarjeta es obligatorio",
};
export const inputCreditCardCvv = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    name: "securityCode",
    label: "CVV*",
    type: "text",
    onlyNumbers: true,
    maxlength: 3,
  },
  errorMessage: "El campo CVV es obligatorio",
};
export const inputCreditCardExpire = {
  ...InputInit,
  typeCmp: typesInputs.input,
  data: {
    ...InputInit.data,
    name: "expireDate",
    label: "Vencimiento*",
    type: "text",
    alphanumeric: false,
    alphabetical: false,
    onlyNumbers: false,
    upperCase: false,
    maxlength: 5,
    pattern: "/^(0?[1-9]{1}|1[0-2]{1})([0-9]{2})$/g",
    mask: "00/00",
  },
  errorMessage: "Ingresa una fecha valida",
};
export const cancelBtnCredit = {
  ...ButtonInit,
  title: "Cancelar",
  type: "text",
  isExpand: true,
};

export const nextBtnCredit = {
  ...ButtonInit,
  title: "Continuar",
  type: "primary",
  isExpand: true,
};

export const backCardOnlinePaymentBtn = {
  ...ButtonInit,
  title: "Atrás",
  type: "text",
  isExpand: true,
};

export const addCardOnlinePaymentBtn = {
  ...ButtonInit,
  icon: "add_circle_outline",
  title: "Agregar tarjeta",
  type: "outlined",
  isExpand: true,
};

export const typesOfCardsPayment = {
  visa: {
    type: "Visa",
    img: "images/pay-visa.svg",
  },
  american: {
    type: "American Express",
    img: "images/pay-american.svg",
  },
  master: {
    type: "MasterCard",
    img: "images/pay-mastercard.svg",
  },
  discover: {
    type: "Discover",
    img: "images/pay-mastercard.svg",
  },
  jcb: {
    type: "JCB",
    img: "images/pay-jcb.svg",
  },
  diners: {
    type: "Diners Club",
    img: "images/pay-diners.svg",
  },
  unknown: {
    type: "unknown",
    img: "images/pay-unknown.svg",
  },
};

export const ulaFededbackInvoice = {
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

export const paymentCardFeedback = {
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

export const stepsCardResume = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  five: 5,
  six: 6,
  seven: 7,
};

export const paymentInvoiceFeedback = {
  left: {
    name: "info",
    status: "warning",
  },
  right: {
    name: null,
  },
  type: "modal",
  isTextEvent: false,
  textEvent: "Dismiss",
};

export const inputPaymentCharges = {
  ...InputInit,
  data: {
    ...InputInit.data,
    maxlength: "50",
    type: "number",
    label: "Ingresa el monto",
    name: "amount",
    alphanumeric: false,
    alphabetical: false,
    onlyNumbers: false,
  },
  value: "",
};
