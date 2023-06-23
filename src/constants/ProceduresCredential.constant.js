const selectInit = {
    textDefault: "Option Default",
    disabled: false,
    reset: false,
    isLabel: true,
  };

  const ButtonInit = {
    type: "primary",
    title: "",
    size: "small",
    icon: "",
    lyIcon: false,
    disabled: false,
    isExpand: false,
  };

  const InputInit = {
    data: {
      label: "",
      name: "",
      type: "text",
      typeButton: "outlined",
      onPaste: true,
      placeholder: "",
      autocomplete: "off",
      disabled: false,
      onlyNumbers: false,
      maxlength: "100",
      pattern: "",
    },
    value: "",
    hasError: false,
    errorMessage: "",
  };
  
export const selectTypeCredential = {
    ...selectInit,
    name: 'selectEquivalenceRequest',
    textDefault: "*Tipo de credencial",
  };

  export const selectRequestCredential = {
    ...selectInit,
    name: 'selectEquivalenceRequest',
    textDefault: "*Tipo de solicitud de credencial",
  };

  export const cancelBtnCredential = {
    ...ButtonInit,
    title: "Cancelar",
    type: "text",
    isExpand: true,
  };

  export const nextBtnCredential = {
    ...ButtonInit,
    title: "Continuar",
    type: "outlined",
    isExpand: true,
  };


  export const inputCredentialNum = {
    ...InputInit,
    data: {
      ...InputInit.data,
      maxlength: "10",
      type: "text",
      onlyNumbers: true,
      label: 'Teléfono',
      name: "phone"
    },
    value: "5566778844",
  };
  
  export const backBtnCredential = {
    ...ButtonInit,
    title: "Atrás",
    type: "text",
    isExpand: true,
  };
  
  export const requestBtnCredential = {
    ...ButtonInit,
    title: "Solicitar",
    type: "outlined",
    isExpand: true,
  };

  export const feedbackNoticeCredential = {
    left: {
      name: "info",
      status: "normal",
    },
    right: {
      name: null,
    },
    type: "alert",
    isTextEvent: false,
    textEvent: "Dismiss",
  };

  export const uploadCredential = {
    title: "Selecciona el archivo",
    extensions: ".jpg, .png, .jpeg",
    disabled: false,
  };