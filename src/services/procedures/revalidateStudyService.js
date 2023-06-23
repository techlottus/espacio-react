import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleErrorPostProcedure } from "../../helpers/handleError";
import { store } from "../../store/store";
import { getFormatDateHelpCenter } from "../../helpers/formatDate";

const baseUrl = "";
const urlRevalidateStudies = env.revalidateStudies;

export const postRevalidateStudiesHttp = async (info, file) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-ss-ces-api",
      "Service-Name": "SS-CES Service API",
    };

    const url = `${baseUrl}${urlRevalidateStudies}`;

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
        chargeAccepted: true,
        comments: info?.comments,
        countryOfBirth: info?.countryOfBirth,
        countryOfPriorStudies: info?.countryOfPriorStudies,
        schoolOfOrigin: info?.schoolOfOrigin,
        street: info?.street,
        number: info?.number,
        neighborhood: info?.neighborhood,
        cp: info?.cp,
        population: info?.population,
        city: info?.city,
        entity: info?.entity,
        schoolPhone: info?.schoolPhone,
        schoolEmail: info?.schoolEmail,
        startDatePreviousLevel: getFormatDateHelpCenter(info?.startDatePreviousLevel),
        endDatePreviousLevel: getFormatDateHelpCenter(info?.endDatePreviousLevel),
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
