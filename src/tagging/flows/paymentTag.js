const paymentInfoDefaultPaymentTag = {
  idgeneral: "gtm",
  seccion: "pagos1",
}

const paymentTwoInfoDefaultPaymentTag = {
  idgeneral: "gtm",
  seccion: "pagos2",
}

const paymentThreeInfoDefaultPaymentTag = {
  idgeneral: "gtm",
  seccion: "pagos3",
}

export const radioBtnConceptPaymentTag = {
  ...paymentInfoDefaultPaymentTag,
  elemento: "colegiatura",
  idsubelement: "",
};

export const switchInvoicePaymentTag = {
  ...paymentInfoDefaultPaymentTag,
  elemento: "swfactura",
  idsubelement: "",
};


export const modalWithoutInvoiceBtnPaymentTag = {
  ...paymentInfoDefaultPaymentTag,
  elemento: "modfactura",
  idsubelement: "",
};

export const stageOneBtnNextPaymentTag = {
  ...paymentInfoDefaultPaymentTag,
  elemento: "continuar",
  idsubelement: "",
};

//Segundo pagos2

export const actionsRfcPaymentTag = {
  ...paymentTwoInfoDefaultPaymentTag,
  elemento: "rfc",
  idsubelement: ""
}

export const stageTwoBtnBackPaymentTag = {
  ...paymentTwoInfoDefaultPaymentTag,
  elemento: "regresar",
  idsubelement: ""
}

export const stageTwoBtnNextPaymentTag = {
  ...paymentTwoInfoDefaultPaymentTag,
  elemento: "continuar",
  idsubelement: ""
}

export const stageTwoTabFisPaymentTag = {
  ...paymentTwoInfoDefaultPaymentTag,
  elemento: "fiscaldata",
  idsubelement: "pfisica"
}

export const stageTwoTabMorPaymentTag = {
  ...paymentTwoInfoDefaultPaymentTag,
  elemento: "fiscaldata",
  idsubelement: "pmoral"
}

export const stageTwoRfcBtnBackPaymentTag = {
  ...paymentTwoInfoDefaultPaymentTag,
  elemento: "fiscaldata",
  idsubelement: "regresar"
}

export const stageTwoRfcBtnNextPaymentTag = {
  ...paymentTwoInfoDefaultPaymentTag,
  elemento: "fiscaldata",
  idsubelement: "avanzar"
}

//Stage 3 Methods Payment

export const radioBtnMethodPaymentTag = {
  ...paymentThreeInfoDefaultPaymentTag,
  elemento: "metodopago",
  idsubelement: ""
}


export const stageThreeBtnBackPaymentTag = {
  ...paymentThreeInfoDefaultPaymentTag,
  elemento: "regresar",
  idsubelement: ""
}

export const stageThreeBtnNextPaymentTag = {
  ...paymentThreeInfoDefaultPaymentTag,
  elemento: "pagar",
  idsubelement: ""
}

export const stageThreeModalConfirmPaymentTag = {
  ...paymentThreeInfoDefaultPaymentTag,
  elemento: "modaldatos",
  idsubelement: ""
}






