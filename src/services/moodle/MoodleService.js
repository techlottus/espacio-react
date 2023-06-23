import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { store } from "../../store/store";

const urlKeyMoodle = env.getKeyMoodle;


export const getTokenMoodleHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);
    headers = {
      ...headers,
      "Service-Id": "virtual-campus-ads-api",
      "Service-Name": "Ads Service API",
    };
    const url = `${urlKeyMoodle}`;
    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    return res;
  } catch (error) {
    console.info(error);
    throw error;
  }
};