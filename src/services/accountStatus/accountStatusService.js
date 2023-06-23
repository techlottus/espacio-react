import axios from "axios";
import env from "../../enviroment/environment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { store } from "../../store/store";
import { handleError } from "../../helpers/handleError";
import { getValuesOfAuth } from "../../helpers/auth";
import { btnActionMovements } from "../../constants/AccountStatus.constant";
import { convertTypeToColor } from "../../helpers/accountStatusTypes";
import { formatDateComplete } from "../../helpers/formatDate";
import { formatString } from "../../helpers/formatString";

const baseUrl = "";
const urlAccount = env.getAccountStatus;
const urlAccountReport = env.getAccountReport;
const urlDebitPeriods = env.getDebitPeriods;
const urlAccountMovements = env.getAccountMovements;
const urlAccountPrograms = env.getPrograms

export const getAccountHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-account-api",
    };

    const { userId } = getValuesOfAuth();
    const params = {
      userId,
    };

    const url = `${baseUrl}${urlAccount}`;
    const { data: res } = await axios({
      method: "get",
      url,
      headers,
      params,
    });
    return res.data;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const getAccountReportHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-account-api",
    };

    const { userId } = getValuesOfAuth();
    const params = {
      userId,
    };

    const url = `${baseUrl}${urlAccountReport}`;
    const res = await axios({
      method: "get",
      url,
      headers,
      params,
      responseType: "blob",
    });

    return res.data;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
}; 

export const getDebitPeriodHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-account-api",
    };

    const url = `${baseUrl}${urlDebitPeriods}`;
    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    return res.data;
  } catch(error) {
    const { status,data } = error.response || { status: null, data:null };
    throw new Error(handleError(status,data));
  }
};

export const getProgramsdHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-account-api",
    };

    const url = `${baseUrl}${urlAccountPrograms}`;
    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    return res.data;
  } catch(error) {
    const { status,data } = error.response || { status: null, data:null };
    throw new Error(handleError(status,data));
  }
};

export const getAccountMovementsHttp = async (period, program) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-account-api",
    };

    const url = `${baseUrl}${urlAccountMovements}?periodCode=${period}&programCode=${program}`;
    const res = await axios({
      method: "get",
      url,
      headers
    });

    let cards = res.data.data.chargeTransactions.map((card) => {
      return {
        code: card.transactionNumber,
        action:card.balance > 0 ? {...btnActionMovements} : null,
        date: formatDateComplete(card.dueDate),
        title: formatString(card.conceptDescription),
        color: convertTypeToColor(card.paymentStatus),
        text: "Saldo",
        price: card.balance,
        rows: [
          { description: "Total de cargos", charge: card.totalAmount },
          { description: "Pagado", charge: card.paid },
          { description: "Descuentos", charge: card.discounts },
        ],
      }
    })

    return {
      endDate: res.data.data.endDate,
      periodBalance: res.data.data.periodBalance,
      periodCode: res.data.data.periodCode,
      periodDescription: res.data.data.periodDescription,
      periodType: res.data.data.periodType,
      startDate: res.data.data.startDate,
      cards
    };
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};
