import { setTextValues } from "../actions/textsAction";
import { getContentStatic } from "../services/static/staticService"
import { accountStatusText } from "../texts/accountStatusText";
import { dashboardText } from "../texts/dashboardText";
import { generalText } from "../texts/generalText";
import { helpCenterText } from "../texts/helpCenterText";
import { loginText } from "../texts/loginText";
import { paymentText } from "../texts/paymentText";
import { proceduresText } from "../texts/proceduresText";
import { screenText } from "../texts/screenText";
import { sidebarText } from "../texts/sidebarText";
import { termsText } from "../texts/termsText";
import { evaluateServicesText } from "../texts/evaluateServicesText";
import { registrationSubjectsText } from "../texts/registrationSubjectsText";

const contentStatic = async() => {
  try {
    const res = await Promise.all([
      getContentStatic('/termsText.json'),
      getContentStatic('/dashboardText.json'),
      getContentStatic('/paymentText.json'),
      getContentStatic('/accoutStatusText.json'),
      getContentStatic('/loginText.json'),
      getContentStatic('/screenText.json'),
      getContentStatic('/sideBarText.json'),
      getContentStatic('/proceduresText.json'),
      getContentStatic('/generalText.json'),
      getContentStatic('/helpCenterText.json'),
      getContentStatic('/evaluateServicesText.json'),
      getContentStatic('/registrationSubjectsText.json'),
    ]);
    return {
      terms: res[0] || termsText,
      dashboard: res[1] || dashboardText,
      payment:  res[2] || paymentText,
      accountStatus: res[3] || accountStatusText,
      login: res[4] || loginText,
      screen:  res[5] || screenText,
      sidebar: res[6] || sidebarText,
      procedures: res[7] || proceduresText,
      general: res[8] || generalText,
      helpCenter: res[9] || helpCenterText,
      evaluateServices: res[10] || evaluateServicesText,
      registrationSubjects: res[11] || registrationSubjectsText
    }
  } catch (error) {
    return null;
  }
}

export const contentStaticMiddleware = () => {
  return (dispatch) => {
    contentStatic().then((texts) => {
      dispatch(setTextValues(texts));
    })
  }
}