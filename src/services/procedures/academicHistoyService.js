import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorGetProcedure, handleErrorPostProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = '';
const urlGetAcademicHistory = env.academicHistory;

export const getAcademicHistoryHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlGetAcademicHistory}`;

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-school-services-consthistcert-api",
      "Service-Name": "School Services - ConstHistCert API",
    };

    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    const { delivery, campus } = res.data;

    const handleOptions = (item) => {
      return {
        active: false,
        text: item.label,
        value: item.value.toString(),
      };
    }

    const optionsTypeDelivery = delivery.map((item) => handleOptions(item));

    const optionsCampusDelivery = campus.map((item) => handleOptions(item));
    return {
      optionsCampusDelivery,
      optionsTypeDelivery,
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};

export const postAcademicHistoryHttp = async (info, file) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-school-services-consthistcert-api",
      "Service-Name": "School Services - ConstHistCert API",
    };
    const url = `${baseUrl}${urlGetAcademicHistory}`;
    const files = (file.name && file.body && file.type) ? [{
      fileName: file.name,
      fileBody: file.body,
      fileType: file.type,
    }]: [];
    
    const {data:res } = await axios({
      method: "post",
      headers,
      url,
      data: {
        phoneNumber: info?.phone,
        delivery: info?.selectTypeDelivery,
        campus: info?.selectCampusDelivery,
        chargeAccepted: true,
        comments: info?.comments,
        files,
      },
    });
    const { ticketNumber, transactionNumber } = res.data;
    return {ticketNumber, transactionNumber};
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
