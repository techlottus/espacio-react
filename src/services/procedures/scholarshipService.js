import axios from "axios";
import env from "../../enviroment/environment";
import { getValuesOfAuth } from "../../helpers/auth";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorPostProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";
import { typesModality } from "../../types/typesProcedures";

const baseUrl = "";
const urlScholarship = env.scholarship;

export const postScholarshipHttp = async (info, fileData) => {

  const modality = getValuesOfAuth().modality === typesModality.withoutDelivery;
  let file = {}
  let scholarshipTypeValue = null;
  if(modality){
    const { file: filetmp, scholarshipTypeValue : scholarshipTypeValuetmp } = Object.entries(fileData).reduce((prev, curr) => {
      if(curr[0].includes('request')) {
        prev = { ...prev, file: { ...prev.file, [curr[0]]: curr[1] } }
        return prev
      }
      return { ...prev, scholarshipTypeValue: curr[1] }
    }, { file: {}, scholarshipTypeValue: null })
    file = {...filetmp};
    scholarshipTypeValue = scholarshipTypeValuetmp;
  } else {
    file = {...fileData}
  }
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-school-services-consthistcert-api",
      "Service-Name": "School Services - ConstHistCert API",
    };

    const url = `${baseUrl}${urlScholarship}`;

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
      phoneNumber: info.phone,
      comments: info.comments,
      files,
      scholarshipTypeValue,
    };

    const { data: res } = await axios({
      method: "post",
      url,
      headers,
      data,
    });
    const { ticketNumber } = res.data;
    return ticketNumber;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};

export const getScholarshipRenovationType = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    const url = `${baseUrl}${urlScholarship}`;

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

    const handleOptions = (item) => {
      return {
        active: false,
        text: item.label,
        value: item.value.toString(),
      };
    }

    const renovationTypes = res.data.map((item) => handleOptions(item))

    return {
      renovationTypes
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleErrorPostProcedure(status, data));
  }
};
