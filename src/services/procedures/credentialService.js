import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorGetProcedure, handleErrorPostProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = '';
const urlCredential = env.credential;

export const getCredentialHttp = async (zip) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlCredential}`;

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-ss-ces-api",
      "Service-Name": "SS-CES Service API",
    };

    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    const { credentialType, credentialRequestType, campus } = res.data;

    const handleOptions = (item) => {
      return {
        active: false,
        text: item.label,
        value: item.value.toString(),
      };
    }

    const optionsCredentialType = credentialType.map((item) => handleOptions(item));

    const optionsCredentialRequestType = credentialRequestType.map((item) => handleOptions(item));

    const optionsCampus = campus.map((item) => handleOptions(item));

    return {
      optionsCredentialType,
      optionsCredentialRequestType,
      optionsCampus
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};


export const postCredentialHttp = async (info,file) => {
  try {
    let headers = filterEmpty(store.getState().headers);
    const url = `${baseUrl}${urlCredential}`;

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-ss-ces-api",
      "Service-Name": "SS-CES Service API",
    };
    const files = {
      fileName: file.name,
      fileBody: file.body,
      fileType: file.type,
    }

    const data = {
      campus: info.selectCampusDelivery,
      credentialType: info.selectTypeCredential,
      credentialRequestType: info.selectTypeCredentialRequest,
      phoneNumber: info.phone,
      chargeAccepted: true,
      comments: info.comments,
      files
    };

    const { data: res } = await axios({
      method: "post",
      url,
      headers,
      data
    });
    const { ticketNumber, transactionNumber } = res.data;
    return {ticketNumber, transactionNumber};
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
