import axios from "axios";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import { handleError } from "../../../helpers/handleError";
import { store } from "../../../store/store";

const baseUrl = "";
const faqsHelpUrl = env.faqsHelp;
// const urlPosttfaqsHelp = env.getfaqsHelp;

export const getFaqsHelpHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${faqsHelpUrl}`;

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-helpcenter-api",
      "Service-Name": "HelpCenter Service API",
    };

    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    return res.data;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};
