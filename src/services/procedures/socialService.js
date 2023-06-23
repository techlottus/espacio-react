import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorGetProcedure, handleErrorPostProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = '';
const urlSocialService = env.getSocialServiceProcedure;

export const getSocialServiceProceduredHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlSocialService}`;

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

    const info = res.data;

    return {
      ...info
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};

export const postSocialServiceHttp = async (info, file, typeId) => {
  try {
    let headers = filterEmpty(store.getState().headers);
    const url = `${baseUrl}${urlSocialService}`;

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-school-services-consthistcert-api",
      "Service-Name": "School Services - ConstHistCert API",
    };
    let oldFiles = [];

    Object.keys(file).forEach((key, index) => {
      if (file[key] !== null) {
        return oldFiles.push(file[key]);
      }
    });

    const files = oldFiles.map((doc) => {
      return {
        fileName: doc.name,
        fileBody: doc.body,
        fileType: doc.type,
      };
    });

    const data = {
      phoneNumber: info?.phone || null,
      socialServiceTypeId: typeId || null,
      institutionName: info?.institutionName || null,
      programManager: info?.programManager || null,
      chargeAccepted: info?.chargeAccepted,
      comments: info?.comments || null,
      files,
      chargeAccepted: true
    };

    const { data: res } = await axios({
      method: "post",
      url,
      headers,
      data,
    });
    const { ticketNumber, transactionNumber } = res.data;

    return  {
      ticketNumber,
      transactionNumber
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};