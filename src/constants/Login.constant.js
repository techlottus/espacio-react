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

export const buttonLogin = {
  ...ButtonInit,
  title: 'Ingresar',
  isExpand: true,
  disabled: false,
};

export const imgLogin = ""
export const imgLogoLogin = texts.login.imgLogo

export const feedbackErrorLogin = {
  left: {
    name: 'report',
    status: 'error',
  },
  right: {
    name: 'close',
  },
  type: 'modal',
  isTextEvent: false,
  textEvent: 'Dismiss',
};

export const typeErrorAuth = {
  error403: 'error 403',
  error401: 'error 401'
}
