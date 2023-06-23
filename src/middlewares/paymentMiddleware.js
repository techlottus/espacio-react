import {
  setConcepts,
  setInvoices,
  getMethods,
  setErrorPayments,
  setMethod,
  setEditForm,
  setInvoice,
  resetPaymentStore,
  setCardsPayment,
  setTaxRegime,
  setSearchAmount,
} from "../actions/paymentAction";
import {
  getConceptsHttp,
  deleteConceptsHttp,
  postSearchAmountService,
} from "../services/payment/paymentService";
import { typesRequestErrors } from "../constants/error.constant";
import {
  deleteInvoiceHttp,
  getInvoicesHttp,
  getTaxRegime,
  postInvoiceHttp,
  postSaveInvoiceHttp,
  putInvoicesHttp,
} from "../services/payment/invoiceServices";
import { setLoading } from "../actions/loadingAction";
import { getValuesOfAuth } from "../helpers/auth";
import env from "../enviroment/environment";
import { getBankDepositHttp } from "../services/payment/bankdeposit";
import { getZipHttp } from "../services/zip/zipService";
import { zipObs } from "../observables/zipObservable";
import {
  deleteCreditCardHttp,
  postCreditCardHttp,
  postStripePaymentHttp,
  getCreditCardsHttp,
} from "../services/payment/creditCard";
import { notiObs } from "../observables/notificationObs";
import { typesNoti } from "../types/typeNoti";
import { texts } from "../texts/indexText";

export const getConceptsService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getConceptsHttp()
      .then((data) => {
        dispatch(setLoading(false));
        if (data.length > 0) {
          dispatch(
            setErrorPayments(typesRequestErrors.getConcepts, false, null)
          );
          dispatch(setConcepts(data));
        } else {
          dispatch(
            setErrorPayments(
              typesRequestErrors.emptyConcepts,
              true,
              "No tienes pagos pendientes"
            )
          );
        }
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.getConcepts, true, message)
        );
      });
  };
};

export const postConceptsService = (idConcept) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    deleteConceptsHttp(idConcept)
      .then(() => {
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.deleteConcept, false, null)
        );
        dispatch(getConceptsService());
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.deleteConcept, true, message)
        );
      });
  };
};

export const getInvoicesService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getInvoicesHttp()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(setErrorPayments(typesRequestErrors.getInvoices, false, null));
        dispatch(setInvoices(res));
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.getInvoices, true, message)
        );
      });
  };
};

export const deleteInvoicesService = (invoiceId) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    deleteInvoiceHttp(invoiceId)
      .then(() => {
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.deleteInvoice, false, null)
        );
        dispatch(getInvoicesService());
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.deleteInvoice, true, message)
        );
      });
  };
};
export const postInvoiceService = (val, saveForm) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    postInvoiceHttp(val)
      .then(() => {
        dispatch(setLoading(false));
        saveForm();
        dispatch(setInvoice(null));
        dispatch(
          setErrorPayments(typesRequestErrors.postInvoices, false, null)
        );
        dispatch(getInvoicesService());
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.postInvoices, true, message)
        );
      });
  };
};

export const putInvoiceService = (val, invoiceId, saveForm) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    putInvoicesHttp(val, invoiceId)
      .then(() => {
        dispatch(setLoading(false));
        saveForm();
        dispatch(setEditForm(null));
        dispatch(setErrorPayments(typesRequestErrors.putInvoices, false, null));
        dispatch(getInvoicesService());
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.putInvoices, true, message)
        );
      });
  };
};

export const getMethodsService = () => {
  return (dispatch) => {
    dispatch(getMethods(["Methods"]));
  };
};

export const getMercadoPagoService = (
  transactionNumber,
  isInvoice,
  invoiceId,
  history
) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    postSaveInvoiceHttp(isInvoice, invoiceId)
      .then(() => {
        dispatch(setLoading(false));
        dispatch(setMethod(null));
        dispatch(resetPaymentStore());
        const { userId } = getValuesOfAuth();
        history.replace("/");
        window.open(
          `${env.getMercadoPago}?studentId=${userId}&transactionNumber=${transactionNumber}`,
          "_blank"
        );
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };
};

export const getBankDepositService = (
  transactionNumber,
  amount,
  isInvoice,
  invoiceId,
  history
) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    postSaveInvoiceHttp(isInvoice, invoiceId)
      .then(() => {
        return getBankDepositHttp(transactionNumber,amount);
      })
      .then((data) => {
        dispatch(setLoading(false));
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "ficha_de_deposito_de_pago.pdf");
        document.body.appendChild(link);
        link.click();
        dispatch(resetPaymentStore());
        dispatch(
          setErrorPayments(typesRequestErrors.bankDepositError, false, null)
        );
        history.replace("/");
      })

      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.bankDepositError, true, message)
        );
      });
  };
};

export const getZipService = (zip) => {
  return (dispatch) => {
    getZipHttp(zip)
      .then((res) => {
        zipObs.next(res);
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setErrorPayments(typesRequestErrors.getZip, true, message));
      });
  };
};

export const postCreditCardService = (tokenId) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    postCreditCardHttp(tokenId)
      .then(() => {
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.postCreditCard, false, null)
        );
        dispatch(getCreditCardsService());
        notiObs.next({
          type: typesNoti.success,
          text: texts?.payment?.success?.postCreditCard,
        });
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.postCreditCard, true, message)
        );
      });
  };
};

export const postSearchAmount = (transactionNumber) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    postSearchAmountService(transactionNumber)
      .then((data) => {
        dispatch(setLoading(false));
        dispatch(setSearchAmount(data));
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        // dispatch(
        //   setErrorPayments(typesRequestErrors.postCreditCard, true, message)
        // );
      });
  };
};

export const deleteCreditCardService = (idCard) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    deleteCreditCardHttp(idCard)
      .then(() => {
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.deleteCreditCard, false, null)
        );
        dispatch(getCreditCardsService());
        notiObs.next({
          type: typesNoti.success,
          text: texts?.payment?.success?.deleteCard,
        });
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(
          setErrorPayments(typesRequestErrors.deleteCreditCard, true, message)
        );
      });
  };
};

export const postStripePaymentService = (values, cardId, history,isInvoice,invoiceId) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    const {id,type} = cardId;

    postSaveInvoiceHttp(isInvoice, invoiceId)
      .then(() => {
        return postStripePaymentHttp(values, id,type);
      })
      .then(() => {
        dispatch(setLoading(false));
        dispatch(resetPaymentStore());
        history.push("/screen/payment-confirm", { isError: false });
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        dispatch(resetPaymentStore());
        history.push("/screen/payment-confirm", { isError: true });
      });
  };
};

export const getCreditCardsService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));

    getCreditCardsHttp()
      .then((cards) => {
        dispatch(setLoading(false));
        dispatch(setCardsPayment(cards));
        dispatch(
          setErrorPayments(typesRequestErrors.getCreditCards, false, null)
        );
      })
      .catch(() => {
        dispatch(setLoading(false));
        dispatch(setErrorPayments(typesRequestErrors.getCreditCards, true, ""));
      });
  };
};

export const getTaxRegimeService = () => {
  return (dispatch) => {
    dispatch(setLoading(true));
    getTaxRegime()
      .then((res) => {
        dispatch(setLoading(false));
        // dispatch(setErrorPayments(typesRequestErrors.getInvoices, false, null));
        dispatch(setTaxRegime(res));
      })
      .catch((err) => {
        const { message } = err;
        dispatch(setLoading(false));
        // dispatch(
        //   setErrorPayments(typesRequestErrors.getInvoices, true, message)
        // );
      });
  };
};