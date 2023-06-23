import { getImageOfAssetsMark } from '../helpers/getImages';
import { texts } from '../texts/indexText';

export const dataPrivacy = {
  type: "outlined",
  title: texts?.terms.btns.btnPrivacy,
  size: "small",
  icon: "",
  disabled: false,
  isExpand: false,
};

export const dataTerms = {
  type: "outlined",
  title: texts?.terms.btns.btnTerms,
  size: "small",
  icon: "",
  disabled: false,
  isExpand: false,
};
export const dataProgress = {
  title: '',
  progress: 0,
  description: texts?.terms.progress.progressZero,
  size: "small",
  disabled: false,
  color: "#002D5D",
};

export const sendBtn = {
  type: "primary",
  title: texts?.terms.btns.btnEnter,
  size: "small",
  icon: "",
  disabled: true,
  isExpand: false,
};

export const dataFeedback = {
  left: {
    name: "info",
    status: "normal",
  },
  type: "message",
  isTextEvent: false,
  textEvent: "",
};

export const typeTermsBtn = {
  accept: 'accept',
  decline: 'decline'
}

export const termsBtns = [
  {
    id: typeTermsBtn.decline,
    type: "outlined",
    title: texts?.terms.btns.btnDecline,
    size: "small",
    icon: "",
    disabled: false,
    isExpand: false,
  },
  {
    id: typeTermsBtn.accept,
    type: "primary",
    title: texts?.terms.btns.btnAccept,
    size: "small",
    icon: "",
    disabled: false,
    isExpand: false,
  },
];


export const dataBack = {
  iconColor: '#f55d2a',
  itemFocusColor: '#f55d2a',
  icon: 'arrow_back',
};

export const privacyContent = texts?.terms.privacyContent;

export const termsContent = texts?.terms.termsContent;

export const toggleData = {
  size: "small",
  status: true,
  disabled: false,
};

export const dataNavBar = {
  urlLogo: getImageOfAssetsMark(texts?.terms?.images?.navBar),
  iconsRight: [{icon: "apps"}],
};

export const dataMenu = {
  items: [
    {
      emoji: texts?.dashboard.menu.logout.emoji,
      text: texts?.dashboard.menu.logout.text,
    },
  ],
  disabledBtnClose: true,
  isShow: true,
};

export const typesTermsAndPrivacy = {
  terms: 'terms',
  privacy: 'privacy',
  promotions: 'promotions'
}

export const feedbackErrorPatchTerm = {
  left: {
    name: 'info',
    status: 'error',
  },
  right: {
    name: 'close',
  },
  type: 'modal',
  isTextEvent: false,
  textEvent: 'Dismiss',
};

export const tabsInit = {
  size: 'small',
  items: [
    {
      icon: null,
      title: 'Aviso de Privacidad',
      id: 'privacy',
      disabled: false,
    },
    {
      icon: null,
      title: 'Términos y condiciones',
      id: 'terms',
      disabled: false,
    },
  ],
  focus: 'privacy',
}

export const linkTerms = {
  text: texts?.terms.downloadTerms.text,
  size: "medium",
  icon: texts?.terms.downloadTerms.icon,
  disabled: false,
  isBold: true,
};