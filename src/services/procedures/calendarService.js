import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorGetProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";
const baseUrl = '';
const urlCalendar = env.calendar;
export const getCalendarHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);
    const url = `${baseUrl}${urlCalendar}`;
    headers = {
      ...headers,
      "Service-Id": "virtual-campus-school-services-consthistcert-api",
      "Service-Name": "School Services - ConstHistCert API",
    };
    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });
    const optionDesk = res.data.desk;
    const optionMobile = res.data.mobile;
    return {
      optionDesk,
      optionMobile
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};

