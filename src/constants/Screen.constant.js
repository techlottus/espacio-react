import { texts } from "../texts/indexText";

export const screenPayment = {
  payment: {
    pending: texts.screen.payment.pending,
    error: texts.screen.payment.error,
    success: texts.screen.payment.success,
  },
  imgPayment: texts.screen.payment.imgPayment,
  confirmation: {
    titleConfirmSuccess: texts.screen.confirmation.titleConfirmSuccess,
    descriptionConfirmSuccess: texts.screen.confirmation.descriptionConfirmSuccess,
    paymentSuccess: texts.screen.confirmation.paymentSuccess,
    paymentError: texts.screen.confirmation.paymentError,
    btnConfirmSuccess: texts.screen.confirmation.btnConfirmSuccess,
    titleConfirmError: texts.screen.confirmation.titleConfirmError,
    btnConfirmReload: texts.screen.confirmation.btnConfirmReload,
    titleConfirm: texts.screen.confirmation.titleConfirm,
    descriptionConfirm: texts.screen.confirmation.descriptionConfirm,
    successConfirmBtn:  texts.screen.confirmation.successConfirmBtn,
  },
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

export const successConfirmBtn = {
  ...ButtonInit,
  isExpand: true,
  title: texts?.screen.confirmation.btnConfirmSuccess,
  type: "primary",
};

export const homeConfirmBtn = {
  ...ButtonInit,
  isExpand: true,
  title: texts?.screen.confirmation.btnConfirmSuccess,
  type: "outlined",
};

export const reloadConfirmBtn = {
  ...ButtonInit,
  isExpand: true,
  title: texts?.screen.confirmation.btnConfirmReload,
  type: "primary",
};
