import { accountStatusText } from "../texts/accountStatusText";
import { dashboardText } from "../texts/dashboardText";
import { helpCenterText } from "../texts/helpCenterText";
import { loginText } from "../texts/loginText";
import { paymentText } from "../texts/paymentText";
import { proceduresText } from "../texts/proceduresText";
import { screenText } from "../texts/screenText";
import { sidebarText } from "../texts/sidebarText";
import { termsText } from "../texts/termsText";
import { types } from "../types/types";

const initialState = {
  texts: {
    terms: termsText,
    dashboard: dashboardText,
    payment: paymentText,
    accountStatus: accountStatusText,
    login: loginText,
    screen: screenText,
    sidebar: sidebarText,
    procedures: proceduresText,
    helpCenter: helpCenterText,
  },
};

export const textsReducer = (state = initialState, action = {}) => {
  if (action.type === types.textsSetValues) {
    return {
      ...state,
      texts: action.payload,
    };
  } else {
    return state;
  }
};
