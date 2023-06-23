import { getImageOfAssetsMark } from "../helpers/getImages";
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

export const dataCardDash = [
  {
    action: {
      ...ButtonInit,
      lyIcon: true,
      icon: texts?.dashboard.playIcon,
      type: "secondary",
      disabled: true,
    },
    width: '100%',
    height: '161px',
    icon: texts?.dashboard.cards.one.icon,
    title: texts?.dashboard.cards.one.title,
    disabled: false, 
  },
  {
    action: {
      ...ButtonInit,
      lyIcon: true,
      icon: texts?.dashboard.playIcon,
      type: "secondary",
      disabled: false,
    },
    width: '100%',
    height: '161px',
    icon: texts?.dashboard.cards.two.icon,
    title: texts?.dashboard.cards.two.title,
    disabled: false,
  },
  {
    action: {
      ...ButtonInit,
      lyIcon: true,
      icon: texts?.dashboard.playIcon,
      type: "secondary",
      disabled: true,
    },
    width: '100%',
    height: '161px',
    icon: texts?.dashboard.cards.three.icon,
    title: texts?.dashboard.cards.three.title,
    disabled: false,
  },
  {
    action: {
      ...ButtonInit,
      lyIcon: true,
      icon: texts?.dashboard.playIcon,
      type: "secondary",
      disabled: true,
    },
    width: '100%',
    height: '161px',
    icon: texts?.dashboard.cards.four.icon,
    title: texts?.dashboard.cards.four.title,
    disabled: false,
  },
  {
    action: {
      ...ButtonInit,
      lyIcon: true,
      icon: texts?.dashboard.playIcon,
      type: "secondary",
      disabled: true,
    },
    width: '100%',
    height: '161px',
    icon: texts?.dashboard.cards.five.icon,
    title: texts?.dashboard.cards.five.title,
    disabled: false,
  },
];

export const dataCarousel = {
  width: '100%',
  height: '100%',
  size: 'medium',
  slides: [],
};

export const dataNavBar = {
  urlLogo: getImageOfAssetsMark(texts?.dashboard.logos),
  iconsRight: [{icon: "apps"}],
};

export const dataNavBarNoAuth = {
  urlLogo: getImageOfAssetsMark(texts?.dashboard.logos),
  iconsRight: [],
};

export const dataFooter = {
  urlLogo: getImageOfAssetsMark(texts?.dashboard.logos),
  text: texts?.dashboard.footerText.text,
  privacy: texts?.dashboard.footerText.privacy,
};

export const dataFooterTerms = {
  urlLogo: getImageOfAssetsMark(texts?.dashboard.logos),
  text: texts?.dashboard.footerText.text,
  privacy: '',
  terms: '',
}

export const dataMenu = {
  items: [
    {
      emoji:  texts?.dashboard.menu.aula.emoji,
      text: texts?.dashboard.menu.aula.text,
    },
    {
      emoji:  texts?.dashboard.menu.book.emoji,
      text: texts?.dashboard.menu.book.text,
    },
    {
      emoji:  texts?.dashboard.menu.helpCenter.emoji,
      text: texts?.dashboard.menu.helpCenter.text,
    },
    {
      emoji:  texts?.dashboard.menu.procedures.emoji,
      text: texts?.dashboard.menu.procedures.text,
    },
    {
      emoji:  texts?.dashboard.menu.accountStatus.emoji,
      text: texts?.dashboard.menu.accountStatus.text,
    },
    {
      emoji:  texts?.dashboard.menu.payment.emoji,
      text: texts?.dashboard.menu.payment.text,
    },
    {
      emoji:  texts?.dashboard.menu.logout.emoji,
      text: texts?.dashboard.menu.logout.text, 
    },
    {
      emoji:  texts?.dashboard.menu.benefits.emoji,
      text: texts?.dashboard.menu.benefits.text, 
    },
  ],
  disabledBtnClose: true,
  isShow: true,
};
