const reinstatementDefaultReinstatementTag = {
  idgeneral: "et",
  seccion: "services",
};

export const downloadReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_dwnld",
  idsubelement: "",
};

export const cancelStepOneReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_p1",
  idsubelement: "cancel",
};

export const nextStepOneReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_p1",
  idsubelement: "next",
};

export const uploadFileReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_p2",
  idsubelement: "upload",
};

export const backStepTwoReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "equivalencia_p2",
  idsubelement: "back",
};

export const nextStepTwoReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_p2",
  idsubelement: "next",
};

export const modalVerifyBackReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_verify",
  idsubelement: "back",
};

export const modalVerifyNextReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_verify",
  idsubelement: "next",
};

export const errorReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_alert",
  idsubelement: "error",
};

export const modalConfirmReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_confirm",
  idsubelement: "show",
};

export const modalConfirmCartReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_confirm",
  idsubelement: "cart",
};

export const modalConfirmCloseReinstatementTag = {
  ...reinstatementDefaultReinstatementTag,
  elemento: "reincorporacion_confirm",
  idsubelement: "close",
};
