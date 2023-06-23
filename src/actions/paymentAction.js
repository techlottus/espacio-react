import { types } from "../types/types";

// Actions

export const setConcepts = (concepts) => {
  return {
    type: types.paymentGetConcepts,
    payload: {
      concepts,
    },
  };
};

export const setTotalPayable = (total) => {
  return {
    type: types.paymentSetTotalPayable,
    payload: {
      total,
    },
  };
};

export const setConcept = (selectConcept) => {
  return {
    type: types.paymentSetConcept,
    payload: {
      selectConcept,
    },
  };
};

export const setConceptDefault = (conceptDefault) => {
  return {
    type: types.paymentConceptDefault,
    payload: {
      conceptDefault,
    },
  };
};

export const setSearchAmount = (searchAmount) => {
  return {
    type: types.paymentSearchAmount,
    payload: {
      searchAmount,
    },
  };
};

export const setErrorPayments = (typeError, isError, msg) => {
  return {
    type: types.paymentErrors,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg,
      },
    },
  };
};

export const setInvoices = (invoices) => {
  return {
    type: types.paymentGetInvoices,
    payload: {
      invoices,
    },
  };
};

export const setCardId = (cardId) => {
  return {
    type: types.paymentSetCardId,
    payload: {
      cardId,
    },
  };
};

export const setInvoice = (selectInvoice) => {
  return {
    type: types.paymentSetInvoice,
    payload: {
      selectInvoice,
    },
  };
};

export const getMethods = (methods) => {
  return {
    type: types.paymentGetMethods,
    payload: {
      methods,
    },
  };
};

export const setMethod = (selectMethod) => {
  return {
    type: types.paymentSetMethod,
    payload: {
      selectMethod,
    },
  };
};

export const setIsInvoice = (isInvoice) => {
  return {
    type: types.paymentSetIsInvoice,
    payload: {
      isInvoice,
    },
  };
};

export const setDownload = (download) => {
  return {
    type: types.paymentGetDownload,
    payload: {
      download,
    },
  };
};
export const setEditForm = (editForm) => {
  return {
    type: types.paymentEditForm,
    payload: {
      editForm,
    },
  };
};

export const setTaxRegime = (taxRegime) => {
  return {
    type: types.paymentTaxRegime,
    payload: {
      taxRegime,
    },
  };
};

export const resetPaymentStore = () => {
  return {
    type: types.paymentReset,
    payload: {},
  };
};

export const setPathExitPayment = (pathExit) => {
  return {
    type: types.paymentPathExit,
    payload: {
      pathExit,
    },
  };
};

export const setZip = (zip) => {
  return {
    type: types.getZip,
    payload: {
      zip,
    },
  };
};

export const setStripePayment = (amount, cardId, transaction) => {
  return {
    type: types.paymentStripe,
    payload: {
      stripePayment: {
        amount,
        cardId,
        transaction,
      },
    },
  };
};

export const setCardsPayment = (cards) => {
  return {
    type: types.paymentSetCards,
    payload: {
      cards,
    },
  };
};
