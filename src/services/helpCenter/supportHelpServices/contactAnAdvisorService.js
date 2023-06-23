import axios from "axios";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import {
  handleErrorPostProcedure,
} from "../../../helpers/handleError";
import { store } from "../../../store/store";

const baseUrl = "";
const proceduresHelpUrl = env.proceduresHelp;

export const postContactAnAdvisorHttp = async (data, recordId, file) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-helpcenter-api",
      "Service-Name": "HelpCenter Service API",
    };
    const url = `${baseUrl}${proceduresHelpUrl}`;
    const files =
    file &&
      file.name && file.body && file.type
        ? [
            {
              fileName: file.name,
              fileBody: file.body,
              fileType: file.type,
            },
          ]
        : []; 
    const { data: res } = await axios({
      method: "post",
      headers,
      url,
      data: {
        recordTypeId: recordId,
        requestTypeValue: null,
        issueDescription: data.description,
        files,
      },
    });
    const { ticketNumber } = res.data;
    return { ticketNumber };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
