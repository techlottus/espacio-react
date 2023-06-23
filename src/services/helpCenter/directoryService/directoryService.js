import axios from "axios";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import { handleError } from "../../../helpers/handleError";
import { store } from "../../../store/store";
import { typesMark } from "../../../types/typesMark";

const baseUrl = "";
const directorydHelpUrl = env.getDirectoryHelp;

export const getDirectoryHelpHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${directorydHelpUrl}`;

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

    const optionCoordinators =
      env.mark === typesMark.ula
        ? res.data.coordinators
        : res.data.coordinators.map((item) => {
            let info = [];
            info.push({
              title: item.name,
            });
            info.push({
              title: item.role,
            });
            info.push({
              title: item.phone,
            });
            info.push({
              title: item.email,
            });
            return info;
          });

    const optionAdvisors = res.data.advisors.map((item) => {
      let info = [];
      info.push({
        title: item.name,
      });
      info.push({
        title: item.role,
      });
      info.push({
        title: item.phone,
      });
      return info;
    });

    const { flagAdvisors } = res.data

    return {
      optionCoordinators,
      optionAdvisors,
      flagAdvisors
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};
