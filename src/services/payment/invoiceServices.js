import axios from "axios";
import { optionCfdi } from "../../constants/Payment.constant";
import env from "../../enviroment/environment";
import { getValuesOfAuth } from "../../helpers/auth";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";

import { store } from "../../store/store";

const baseUrl = "";
const urlInvoices = env.invoices;
const urlSaveInvoice = env.saveInvoice;
const urlDeleteInvoice = env.deleteInvoice;
const urlTaxRegime = env.taxRegime;

export const getInvoicesHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-invoicing-api",
    };
    const url = `${baseUrl}${urlInvoices}`;
    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });

    return res.data;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const deleteInvoiceHttp = async (invoiceId) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-invoicing-api",
    };
    const url = `${baseUrl}${urlDeleteInvoice}/${invoiceId}`;
    await axios({
      method: "post",
      url,
      headers,
    });

    return;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const postInvoiceHttp = async (val) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-invoicing-api",
    };
    const url = `${baseUrl}${urlInvoices}`;
    const address =
      val.zipCode && val.zipCode.length > 0
        ? {
            zipCode: val.zipCode && val.zipCode.length > 0 ? val.zipCode : null,
            state: val.state && val.state.length > 0 ? val.state : null,
            city: val.city && val.city.length > 0 ? val.city : null,
            neighborhood:
              val.neighborhood && val.neighborhood.length > 0
                ? val.neighborhood
                : null,
            street: val.street && val.street.length > 0 ? val.street : null,
          }
        : null;
    await axios({
      method: "post",
      headers,
      url,
      data: {
        service: {
          id: "virtual-campus-invoicing-api",
          name: "Invoicing Service API",
        },
        data: {
          businessName:
            val.businessName && val.businessName.length > 0
              ? val.businessName
              : null,
          fullName:
            val.fullName && val.fullName.length > 0 ? val.fullName : null,
          rfc: val.rfc && val.rfc.length > 0 ? val.rfc : null,
          curp: val.curp && val.curp.length > 0 ? val.curp : null,
          address: address,
          email: val.email && val.email.length > 0 ? val.email : null,
          cfdiUsage: val.cfdi && val.cfdi.length > 0 ? val.cfdi : null,
          personType: val.personType,
          regime: val.regime && val.regime.length > 0 ? val.regime : null,
        },
      },
    });
    return;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const putInvoicesHttp = async (val, invoiceId) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-invoicing-api",
    };
    const url = `${baseUrl}${urlInvoices}/${invoiceId}`;
    const address =
      val.zipCode && val.zipCode.length > 0
        ? {
            zipCode: val.zipCode && val.zipCode.length > 0 ? val.zipCode : null,
            state: val.state && val.state.length > 0 ? val.state : null,
            city: val.city && val.city.length > 0 ? val.city : null,
            neighborhood:
              val.neighborhood && val.neighborhood.length > 0
                ? val.neighborhood
                : null,
            street: val.street && val.street.length > 0 ? val.street : null,
          }
        : null;
    await axios({
      method: "post",
      headers,
      url,
      data: {
        service: {
          id: "virtual-campus-invoicing-api",
          name: "Invoicing Service API",
        },
        data: {
          businessName:
            val.businessName && val.businessName.length > 0
              ? val.businessName
              : null,
          fullName:
            val.fullName && val.fullName.length > 0 ? val.fullName : null,
          rfc: val.rfc && val.rfc.length > 0 ? val.rfc : null,
          curp: val.curp && val.curp.length > 0 ? val.curp : null,
          address: address,
          email: val.email && val.email.length > 0 ? val.email : null,
          cfdiUsage: val.cfdi && val.cfdi.length > 0 ? val.cfdi : null,
          personType: val.personType,
          regime: val.regime && val.regime.length > 0 ? val.regime : null,
        },
      },
    });
    return;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const postSaveInvoiceHttp = async (isInvoice, invoiceId) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-invoicing-api",
    };
    const url = `${baseUrl}${urlSaveInvoice}`;
    const { email } = getValuesOfAuth();
    const body = {
      data: {
        userEmail: email,
        requireInvoice: isInvoice,
        invoicingInformationId: invoiceId || null,
      },
    };
    await axios({
      method: "post",
      url,
      headers,
      data: body,
    });

    return;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const getTaxRegime = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);
    headers = {
      ...headers,
      "Service-Id": "virtual-campus-invoicing-api",
    };
    const url = `${baseUrl}${urlTaxRegime}`;
    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });
    const handleOptions = (item) => {
      return {
        active: false,
        text: item.description,
        value: item.regime.toString(),
        id: item.cfdiUsage,
      };
    };
    const newItem = res.data.map((item) => {
      return handleOptions(item);
    });
    let [D, G, P] = [[], [], []];
    newItem.forEach((item) => {
      if (optionCfdi[0].value === item.id) {
        D.push(item);
      } else if (optionCfdi[1].value === item.id) {
        G.push(item);
      } else {
        P.push(item);
      }
    });
    return {
      D10: D,
      G03: G,
      P01: P,
    };
  } catch (error) {
    console.log(error, "error");
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};
