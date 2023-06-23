import axios from "axios";
import env from "../../enviroment/environment";
import { getValuesOfAuth } from "../../helpers/auth";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = env.host;
const urlLogsErrors = env.logsErrors;

export const postLogErrorsHttp = async (typeError,path) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlLogsErrors}`;

    const {email,userId} = getValuesOfAuth();

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-log-api",
      "Service-Name": "Log Error Service API",
    };
    const data = {
      typeError,
      url: path,
      browserProperties: {
        useAgent: navigator.userAgent
      },
      date: new Date().toDateString(),
      studentId: userId,
      email,
    };

    const { data: res } = await axios({
      method: "post",
      url,
      headers,
      data
    });

    return res.data;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};
