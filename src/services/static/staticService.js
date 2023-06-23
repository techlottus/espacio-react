import axios from "axios";
import env from "../../enviroment/environment";

const baseUrl = env.contentStatic;

export const getContentStatic = async (path) => {
  try {
    const url = `${baseUrl}${path}`
    const res = await axios({
      method: "get",
      url,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};
