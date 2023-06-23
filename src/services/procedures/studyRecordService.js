import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { convertMoney } from "../../helpers/formatCurrency";
import { handleErrorGetProcedure, handleErrorPostProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = '';
const urlRecordStudy = env.studyRecord;

export const getStudyRecordHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlRecordStudy}`;

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

    const { proofOfStudies, delivery, campus, modal } = res.data;

    const optionsTypeRecord = proofOfStudies.map((item) => {
      return {
        active: false,
        text: `${convertMoney(item.cost)} - ${item.label}`,
        value: item.value.toString(),
        cost: convertMoney(item.cost),
        detailId: item.detailId
      };
    });

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
      optionsTypeRecord,
      optionsTypeDelivery,
      optionsCampusDelivery,
      modal
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};

export const postStudyRecordHttp = async (info,file, detailId) => {
  try {
    let headers = filterEmpty(store.getState().headers);
    const url = `${baseUrl}${urlRecordStudy}`;

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-school-services-consthistcert-api",
      "Service-Name": "School Services - ConstHistCert API",
    };

    const files = (file.name && file.body && file.type) ? [{
      fileName: file.name,
      fileBody: file.body,
      fileType: file.type,
    }]: [];

    const data = {
      delivery: info.selectTypeDelivery,
      campus: info.selectCampusDelivery,
      proofOfStudyType: info.selectTypeRecord,
      phoneNumber: info.phone,
      sendToSedena: info.isCheck,
      chargeAccepted: true,
      comments: info.comments,
      files,
      detailId
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
