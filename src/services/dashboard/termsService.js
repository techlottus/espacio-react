import axios from "axios";
import { typesTermsAndPrivacy } from "../../constants/Terms.constant";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = '';
const urlPrivacyNotice = env.privacyNotice;


export const getPrivacyNoticeHttp = async () => {
  try {
    const headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlPrivacyNotice}`;
    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    return res.data;
  } catch (error) {
    const { status,data } = error.response || { status: null, data:null };
    throw new Error(handleError(status,data));
  }
};

export const patchPrivacyNoticeHttp = async (type) => {

  try {
    const headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlPrivacyNotice}`;
    const { data: res } = await axios({
      method: "patch",
      url,
      headers,
      data: {
        privacy_notice_agreed: type === typesTermsAndPrivacy.privacy,
        terms_and_conditions_agreed: type === typesTermsAndPrivacy.terms,
        promotions_and_discounts: type === typesTermsAndPrivacy.promotions,
      },
    });

    return res.data;

  } catch (error) {
    const { status,data } = error.response || { status: null, data:null };
    throw new Error(handleError(status,data));
  }
};
