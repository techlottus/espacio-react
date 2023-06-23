import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorPostProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = "";
const urlReinstatement = env.reinstatement;

export const postReinstatementHttp = async (info, file) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-ss-ces-api",
      "Service-Name": "SS-CES Service API",
    };

    const url = `${baseUrl}${urlReinstatement}`;

    let oldFiles = [];

    Object.keys(file).forEach((key, index) => {
      if (file[key] !== null) {
        return oldFiles.push(file[key]);
      }
    });

    const files = oldFiles.map((doc) => {
      return {
        fileName: doc.name,
        fileBody: doc.body,
        fileType: doc.type,
      };
    });

    const data = {
      phoneNumber: info.phone,
      chargeAccepted: true,
      comments: info.comments,
      files,
    };

    const { data: res } = await axios({
      method: "post",
      url,
      headers,
      data,
    });
    const { ticketNumber } = res.data;
    return ticketNumber;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
