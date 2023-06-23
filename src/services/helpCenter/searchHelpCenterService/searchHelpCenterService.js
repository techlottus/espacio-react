import axios from "axios";
import { buttonInit } from "../../../constants/HelpCenter.constant";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import { store } from "../../../store/store";
import { typesFormsHelpCenter } from "../../../types/typesHelpCenter";

const baseUrl = '';
const searchHelCenterpUrl = env.searchHelpCenter;

export const postSearchHelpCenterHttp = async (phrase) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-helpcenter-api",
      "Service-Name": "HelpCenter Service API",
    };
    const url = `${baseUrl}${searchHelCenterpUrl}`;
    const { data: res } = await axios({
      method: "post",
      headers,
      url,
      data: {
        searchPhrase: phrase
      },
    });
    const { recordType,faqs } = res.data;
    const keys = Object.keys(typesFormsHelpCenter);
    const items = {}
    keys.forEach((key) => {
      const subKeys = Object.keys(typesFormsHelpCenter[key]);
      subKeys.forEach((subKey) => {
        const config = typesFormsHelpCenter[key][subKey];
        items[subKey] = {...config};
      });
    })
    const tickets = [];
    recordType.forEach((record) => {
      if(items[record.name]) {
        tickets.push({
          title: record.description,
          actions: [
            {
              type: "button",
              configBtn: {
                ...buttonInit,
                type: "primary",
                lyIcon: true,
                icon: "add_circle",
              },
            },
          ],
          disabled: false,
          path: items[record.name].path
        })
      }
    })

    const faqsFormat = faqs.map((faq) => {
      return  {
        title: faq.question,
        description: faq.answer,
        list: []
      }
    })
    return {
      tickets: tickets.length > 0 ? tickets: null,
      faqs: faqsFormat.length > 0 ? faqsFormat:null
    };
  } catch (error) {
    //const { status, data } = error.response || { status: null, data: null };
    //throw new Error(handleErrorPostProcedure(status, data));
  }
};