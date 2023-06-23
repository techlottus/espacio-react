import axios from "axios";
import { buttonInit } from "../../../constants/HelpCenter.constant";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import { handleErrorGetProcedure } from "../../../helpers/handleError";
import { store } from "../../../store/store";
import { typesFormsHelpCenter } from "../../../types/typesHelpCenter";

const baseUrl = "";
const proceduresHelpUrl = env.proceduresHelp;

export const getProceduresHelpHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${proceduresHelpUrl}`;

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

    const { recordType, faqs, ades } = res.data;
    const recordTypeId = recordType[0].recordTypeId;

    const items = [];

    recordType[0].issues.forEach((ticket) => {
      items.push(ticket);
    });

    let issues = [];

    items.forEach((element) => {
      let id = typesFormsHelpCenter.proceduresHelp.find(
        (el) => el?.id === element?.value
      );

      if (id) {
        issues.push(id);
      }
    });

    const tickets = [];
    issues.forEach((record) => {
      tickets.push({
        title: record.label,
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
        path: record.path,
      });
    });
    const handleOptions = (item) => {
      return {
        active: false,
        text: item.adeName,
        value: item.ownerId.toString(),
      };
    };

    const optionsAdes = ades.map((item) => handleOptions(item));

    return {
      tickets,
      recordType,
      faqs,
      optionsAdes,
      recordTypeId,
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};
