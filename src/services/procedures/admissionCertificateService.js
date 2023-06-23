import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorPostProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = "";
const urlAdmissionCertificate = env.admissionCertificate;

export const postAdmissioncertificateHttp = async (info, file) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-school-services-consthistcert-api",
      "Service-Name": "School Services - ConstHistCert API",
    };

    const url = `${baseUrl}${urlAdmissionCertificate}`;

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

    const { data: res } = await axios({
      method: "post",
      url,
      headers,
      data: {
      phoneNumber: info?.phone,
      comments: info?.comments,
      files,
      countryOfBirth: info?.countryOfBirth,
      countryOfPriorStudies: info?.countryOfPriorStudies,
      schoolOfOrigin: info?.schoolOfOrigin,
      dateStudiesStarted: info?.dateStudiesStarted,
      dateStudiesFinished: info?.dateStudiesFinished,
    },
  });

    const { ticketNumber, transactionNumber } = res.data;
    return {ticketNumber, transactionNumber};
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
