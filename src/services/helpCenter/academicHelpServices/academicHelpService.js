import axios from "axios";
import { buttonInit } from "../../../constants/HelpCenter.constant";
import env from "../../../enviroment/environment";
import { filterEmpty } from "../../../helpers/filterEmpty";
import { handleErrorGetProcedure } from "../../../helpers/handleError";
import { store } from "../../../store/store";
import { typesFormsHelpCenter } from "../../../types/typesHelpCenter";
import { typesMark } from "../../../types/typesMark";

const baseUrl = "";
const academicHelpUrl = env.academicHelp;
// const urlPosttAcademicHelp = env.getAcademicHelp;

export const getAcademicHelpHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${academicHelpUrl}`;

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

    const keys = Object.keys(typesFormsHelpCenter);
    const items = {}
    keys.forEach((key) => {
      const subKeys = Object.keys(typesFormsHelpCenter[key]);
      subKeys.forEach((subKey) => {
        const config = typesFormsHelpCenter[key][subKey];
        items[subKey] = {...config};
      });
    })


    let newRecordType = [];

    if(env.mark === typesMark.ula) {
      newRecordType = recordType.map((e) => {
        return {
          ...e,
          name: e.name.replace('Ula','')
        }
      })
    } else {
      newRecordType = [...recordType]
    }

    const tickets = [];
    newRecordType.forEach((record) => {
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

    const handleOptions = (item) => {
      return {
        active: false,
        text: item.adeName,
        value: item.ownerId.toString(),
      };
    }

   const optionsAdes = ades.map((item) => {
     return {
       ...handleOptions(item),
       adeId: item?.adeId,
       ownerId: item?.ownerId
     }
   }); 

    return {
      tickets,
      recordType: newRecordType,
      faqs,
      optionsAdes
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};
