import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorGetProcedure, handleErrorPostProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";
import { convertMoney } from "../../helpers/formatCurrency";

const baseUrl = '';
const urlCertificateStudy = env.certificateStudy;

export const getCertificateStudyHttp = async (zip) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlCertificateStudy}`;

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

    const { studyCertificateType,studyCertificateTotalType, delivery, campus } = res.data;

    const optionsCertificateType = studyCertificateType.map((item) => {
      return {
        active: false,
        text: `${convertMoney(item.cost)} - ${item.label}`,
        value: item.value.toString(),
        detailId: item.detailId,
        cost: convertMoney(item.cost)
      };
    });

    const handleOptions = (item) => {
      return {
        active: false,
        text: item.label,
        value: item.value.toString(),
      };
    }

    const optionsCertificatTotalType = studyCertificateTotalType.map((item) => handleOptions(item));

    const optionsTypeDelivery = delivery.map((item) => handleOptions(item));

    const optionsCampus = campus.map((item) => handleOptions(item));

    return {
      optionsCertificateType,
      optionsCertificatTotalType,
      optionsTypeDelivery,
      optionsCampus
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorGetProcedure(status, data));
  }
};


export const postCertificateStudyHttp = async (info,file, detailId) => {
  try {
    let headers = filterEmpty(store.getState().headers);
    const url = `${baseUrl}${urlCertificateStudy}`;

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
      studyCertificateType: info.selectTypeCertificate,
      studyCertificateTotalType: info.selectCertificateRequest,
      phoneNumber: info.phone,
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
