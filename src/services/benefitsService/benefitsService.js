import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = "";
const getBenefits = env.getBenefits;

export const getBenefitsHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-ads-api",
      "Service-Name": "Ads Service API"
    };

    const url = `${baseUrl}${getBenefits}`;

    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    const benefitsCards = [];

    res.data.forEach((info) => {
      benefitsCards.push({
        id: info._id,
        requirements: info.requirements,
        detailImg: info.image,
        description: info.description,
        category: info.category,
        school: info.school,
        contact: info.contact,
        pdf: info.pdf,
        urlImage: info.logo,
        subtitle: info.brand,
        title: info.title,
        text: info.validityDate,
        border: true,
        type: 'vertical',
        link: true,
        small: false,
        allContent: true,
        background: true,
        height: "",
        isShowCardWebsiteContent: false,
  
      });
    });

    return {
      benefitsCards,
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};
