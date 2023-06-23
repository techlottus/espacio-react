import axios from "axios";
import env from "../../enviroment/environment";
import { getValuesOfAuth } from "../../helpers/auth";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorGetProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";
import { typeProcedure } from "../../types/typesProcedures";

const baseUrl = "";
const urlGetProceduresCosts = env.proceduresCosts;

export const getProceduresCostsHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-payment-api",
    };

    const url = `${baseUrl}${urlGetProceduresCosts}`;

    const {data:res} = await axios({
      method: "get",
      url,
      headers,
    });

    const formality1 =  res.data?.formality1.map((e) => {
      const item = Object.keys(typeProcedure).filter((procedure) => {
        return typeProcedure[procedure]?.id === e.formalityNumber
      })[0];
      const permissions = getValuesOfAuth().permissions;
      return {
        isShow: permissions.serviciosEscolares.functions[e?.acronym]?.access || false,
        path: typeProcedure[item]?.path || null,
        icon: e?.status === '1' ? typeProcedure[item]?.icon: 'warning',
        type: typeProcedure[item]?.type,
        tag: typeProcedure[item]?.tag,
        title: e?.name,
        disabled: e?.status === '0',
        isContent: true,
        urlOpenOut: typeProcedure[item]?.urlOpenOut || null,
        content: {
          text: e?.description,
          price: e?.status === '1' ? e?.cost: 'Por el momento esta opción no está disponible',
        },
      };
    }).filter((e) => e?.isShow);

    const formality2 =  res.data?.formality2.map((e) => {
      const item = Object.keys(typeProcedure).filter((procedure) => {
        return typeProcedure[procedure].id === e.formalityNumber
      })[0];
      const permissions = getValuesOfAuth().permissions;
      return {
        isShow: getValuesOfAuth().socialService.key === e?.acronym ? (
          permissions.serviciosEscolares.functions[e?.acronym]?.access && getValuesOfAuth().socialService.isTotalCredit && getValuesOfAuth().socialService.isDocsValid
        ): permissions.serviciosEscolares.functions[e?.acronym]?.access,
        path: typeProcedure[item].path,
        icon: e?.status === '1' ? typeProcedure[item].icon: 'warning',
        type: typeProcedure[item].type,
        tag: typeProcedure[item].tag,
        title: e?.name,
        disabled: e?.status === '0', 
        isContent: true,
        content: {
          text: e?.description,
          price: e?.status === '1' ? e?.cost: 'Por el momento esta opción no está disponible',
        },
      };
    }).filter((e) => e?.isShow);


    return {
      formality1,
      formality2
    }
  } catch (error) {
    const { status, data } = error?.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};
