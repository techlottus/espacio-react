import axios from "axios";
import env from "../../enviroment/environment";
import { assingCardImagePayment } from "../../helpers/assingCardsPayment";
import { filterEmpty } from "../../helpers/filterEmpty";
import { handleError } from "../../helpers/handleError";
import { store } from "../../store/store";

const baseUrl = "";
const urlPostCreditCard = env.postCreditCard;
const urlDeleteCreditCard = env.deleteCreditCard;
const urlPostStripePayment = env.stripePayment;
const urlGetCreditCards = env.getCreditCards;

export const postCreditCardHttp = async (tokenId) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-payment-api",
    };

    const url = `${baseUrl}${urlPostCreditCard}`;
    await axios({
      method: "post",
      headers,
      url,
      data: {
        service: {
          id: "virtual-campus-payment-api",
          name: "Payment Service API",
        },
        data: {
          tokenId,
        },
      },
    });
    return;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const postStripePaymentHttp = async (values, cardId, funding) => {
  try {
    let headers = filterEmpty(store.getState().headers);
    let { totalPayable, searchAmount } = store.getState().payment;

    headers = {
      ...headers,
      "Service-Id": "virtual-campus-payment-api",
    };

    const url = `${baseUrl}${urlPostStripePayment}`;
    await axios({
      method: "post",
      headers,
      url,
      data: {
        service: {
          id: "virtual-campus-payment-api",
          name: "Payment Service API",
        },
        data: {
          amount: totalPayable.toString(),
          currency: "MXN",
          cardId,
          funding,
          transactionNumber: searchAmount.transactionNumber,
        },
      },
    });
    return;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const deleteCreditCardHttp = async (idCard) => {
  try {
    let headers = filterEmpty(store.getState().headers);

    headers = {
      ...headers,
      "Service-Id": " virtual-campus-payment-api",
    };

    const url = `${baseUrl}${urlDeleteCreditCard}`;

    const { data: res } = await axios({
      method: "post",
      url,
      headers,
      data: {
        data: {
          idcard: idCard,
        },
        service: {
          id: "virtual-campus-payment-api",
          name: "Payment Service API",
        },
      },
    });
    return res.data;
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};

export const getCreditCardsHttp = async () => {
  try {
    let headers = filterEmpty(store.getState().headers);
    let cardId = store.getState()?.payment?.cardId?.id;

    headers = {
      ...headers,
      "Service-Id": " virtual-campus-payment-api",
    };

    const url = `${baseUrl}${urlGetCreditCards}`;

    const { data: res } = await axios({
      method: "get",
      url,
      headers,
    });
    const { data: cards } = res;
    return cards.map((card) => {
      let check = cardId && cardId === card?.id;
      return {
        id: card?.id,
        type: card?.funding,
        ownerName: card?.name,
        actions: check ? [] : ["delete"],
        ownerCardNumber: card?.last4,
        checked: check,
        imgCard: assingCardImagePayment(card?.brand),
      };
    });
  } catch (error) {
    const { status, data } = error.response || { status: null, data: null };
    throw new Error(handleError(status, data));
  }
};
