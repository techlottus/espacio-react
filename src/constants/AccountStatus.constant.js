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

export const breadcrumb = {
  iconColor: "#e14504",
  itemFocusColor: "#e14504",
  textItems: [
    {
      value: "/",
      text: "Home",
    },
    {
      value: "/account-status",
      text: "Estado de cuenta",
    },
  ],
  icon: "home",
};

export const cardProfile = {
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

export const downloadBtn = {
  ...ButtonInit,
  title: texts.accountStatus.btnDownload.download,
  isExpand: true,
  icon: "file_download",
};

export const checkInvoiceBtn = {
  ...ButtonInit,
  title: texts.accountStatus.btnInvoice.checkInvoice,
  isExpand: true,
  icon: "description",
  type: "outlined",
  disabled: false,
};

export const feedbackErrorAccount = {
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

export const feedbackSuccess = {
  left: {
    name: "check_circle",
    status: "success",
  },
  right: {
    name: "close",
  },
  type: "modal",
  isTextEvent: false,
  textEvent: "Dismiss",
};

export const accountStatusTableMobile = {
  position: "horizontal",
  size: "medium",
  rows: [],
  headers: [
    { title: texts.accountStatus.tableAccountStatus[0].title },
    { title: texts.accountStatus.tableAccountStatus[2].title },
    { title: texts.accountStatus.tableAccountStatus[3].title },
  ],
};

export const accountStatusTableDesktop = {
  position: "horizontal",
  size: "medium",
  rows: [],
  headers: [
    { title: texts.accountStatus.tableAccountStatus[0].title },
    { title: texts.accountStatus.tableAccountStatus[1].title },
    { title: texts.accountStatus.tableAccountStatus[2].title },
    { title: texts.accountStatus.tableAccountStatus[3].title },
  ],
};

const selectInit = {
  textDefault: "Option Default",
  disabled: false,
  icon: "person",
  reset: false,
};

export const btnActionMovements = {
  ...ButtonInit,
  lyIcon: false,
  title: "Pagar",
  type: "primary",
  disabled: false,
};

export const optionsPrograms = [
  {
    value: "derecho",
    active: false,
    text: "Licenciatura en Derecho",
  },
];

export const optionsPeriod = [
  {
    value: "2020",
    active: false,
    text: "202125 / 20 Nov - 20 Ene 2021",
  },
];

export const selectProgram = {
  typeCmp: "select",
  name: "program",
  data: {
    ...selectInit,
    icon: null,
    textDefault: "Seleccione programa",
  },
  options: [...optionsPrograms],
};

export const selectPeriod = {
  typeCmp: "select",
  name: "period",
  data: {
    ...selectInit,
    icon: null,
    textDefault: "Seleccione periodo",
  },
  options: [...optionsPeriod],
};

export const labelInit = {
  id: "1",
  type: "outlined",
  title: "En curso",
  icon: "done",
  iconEvent: "",
  size: "medium",
  disabled: false,
};

export const cardMovementsInit = {
  action: {
    ...ButtonInit,
    lyIcon: false,
    title: "Pagar",
    type: "primary",
    disabled: false,
  },
  date: "09 Agosto 2021",
  title: "Licenciatura en Diseño Gráfico",
  color: "debt",
  text: "Saldo",
  price: 2405.5,
  rows: [
    { description: "Total de cargos", charge: 2405.5 },
    { description: "Pagado", charge: 0.0 },
    { description: "Descuentos", charge: 0.0 },
  ],
};

export const breadcrumbInvoiceQuery = {
  textItems: [
    {
      value: "/",
      text: "Home",
    },
    {
      value: "/account-status",
      text: "Estado de cuenta",
    },
    {
      value: "/account-status-invoices-query",
      text: "Consulta de facturas",
    },
  ],
  icon: "arrow_back",
};

export const clearInvoiceQuery = {
  ...ButtonInit,

  icon: "loop",
  title: texts?.accountStatus.btnInvoiceQuery.clear,
  isExpand: true,
  type: "outlined",
};

export const downloadInvoiceQuery = {
  ...ButtonInit,

  icon: "download",
  title: texts?.accountStatus.btnInvoiceQuery.download,
  isExpand: true,
  type: "text",
};

export const linkInvoiceQuery = {
  text: texts?.accountStatus.linkInvoiceQuery,
  size: "medium",
  disabled: false,
  isBold: true,
};

export const invoiceQueryTableMobile = {
  position: "horizontal",
  size: "medium",
  rows: [
    [
    { title: texts.accountStatus.tableRowInvoiceQuery[0].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[1].title },
  ],
  [
    { title: texts.accountStatus.tableRowInvoiceQuery[0].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[1].title },
  ],
  [
    { title: texts.accountStatus.tableRowInvoiceQuery[0].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[1].title },
  ]
],
  checkbox: true,
  headers: [
    { title: texts.accountStatus.tableInvoiceQuery[0].title },
    { title: texts.accountStatus.tableInvoiceQuery[1].title },
  ],
};

export const invoiceQueryTableDesktop = {
  position: "horizontal",
  size: "medium",
  rows: [
    [
    { title: texts.accountStatus.tableRowInvoiceQuery[0].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[1].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[2].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[3].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[4].title },
    { icon: 'visibility', download: true },
    { icon: 'description', download: true },
    { icon: 'code', download: true },
  ],
  [
    { title: texts.accountStatus.tableRowInvoiceQuery[0].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[1].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[2].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[3].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[4].title },
    { icon: 'visibility', download: true },
    { icon: 'description', download: true },
    { icon: 'code', download: true },
  ],
  [
    { title: texts.accountStatus.tableRowInvoiceQuery[0].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[1].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[2].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[3].title },
    { title: texts.accountStatus.tableRowInvoiceQuery[4].title },
    { icon: 'visibility', download: true },
    { icon: 'description', download: true },
    { icon: 'code', download: true },
  ]
],
  checkbox: true,
  headers: [
    { title: texts.accountStatus.tableInvoiceQuery[0].title },
    { title: texts.accountStatus.tableInvoiceQuery[1].title },
    { title: texts.accountStatus.tableInvoiceQuery[2].title },
    { title: texts.accountStatus.tableInvoiceQuery[3].title },
    { title: texts.accountStatus.tableInvoiceQuery[4].title },
    { title: texts.accountStatus.tableInvoiceQuery[5].title },
    { title: texts.accountStatus.tableInvoiceQuery[6].title },
    { title: texts.accountStatus.tableInvoiceQuery[7].title },
    
  ],
};

const selectInitInvoiceQuery = {
  textDefault: "Option Default",
  disabled: false,
  reset: false,
  isLabel: true,
};

export const selectInvoiceQuery = {
  ...selectInitInvoiceQuery,
  name: "selectInvoiceQuery",
  textDefault: "20 de agosto",
};

// const selectInit = {
//   textDefault: "Option Default",
//   disabled: false,
//   icon: "person",
//   reset: false,
// };

export const feedbackErrorAccountStatus = {
  left: {
    name: "info",
    status: "normal",
  },
  type: "alert",
  isTextEvent: false,
  textEvent: "Dismiss",
};