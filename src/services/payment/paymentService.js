import axios from "axios";
import env from "../../enviroment/environment";
import { getValuesOfAuth } from "../../helpers/auth";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = "";
const urlGetConcepts = env.getConcepts;
const urlDeleteConcept = env.deleteConcept;
const urlPostSearchAmount = env.postSearchAmount

export const getConceptsHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-payment-api",
    };

    const url = `${baseUrl}${urlGetConcepts}`;

    const { userId: studentId } = getValuesOfAuth();

    const params = {
      studentId,
      status: "pending",
    };

    const { data: res } = await axios({
      method: "get",
      url,
      params,
      headers,
    });
    return res.data;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const deleteConceptsHttp = async (idConcept) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": " virtual-campus-payment-api",
    };

    const url = `${baseUrl}${urlDeleteConcept}`;

    const { userId } = getValuesOfAuth();

    const body = {
      data: {
        userId: userId,
        transactionNumber: idConcept,
      }
    };

    const { data: res } = await axios({
      method: "post",
      url,
      headers,
      data: body,
    });
    return res.data;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const postSearchAmountService = async(transactionNumber) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": " virtual-campus-payment-api",
    };

    const url = `${baseUrl}${urlPostSearchAmount}`;

    const body = {
      data: {
        transactionNumber,
      }
    }
    
    const { data: res } = await axios({
      method: "post",
      url,
      headers,
      data: body,
    });

    return res.data;
  }
  catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
}
