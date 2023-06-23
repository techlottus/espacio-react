import axios from "axios";
import env from "../../enviroment/environment";
import { getCookieRefresh } from "../../helpers/cookies";
import { filterEmpty } from "../../helpers/filterEmpty";
import { store } from "../../store/store";

const urlCheckAuth = env.checkAuth;
const urlRefresh = env.refreshToken;


export const getCheckAuthHttp = async () => {
  try {
    const headers = filterEmpty(store.getState().headers);
    const url = `${urlCheckAuth}`;
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

export const getRefreshTokenHttp = async () => {
  try {
    const body = {
      refreshToken: getCookieRefresh()
    }
    const url = `${urlRefresh}`;
    const { data: res } = await axios({
      method: "post",
      url,
      data: body
    });

    return res.accessToken;
  } catch (error) {
    console.info(error);
    throw error;
  }
};