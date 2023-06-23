import { listStyle } from "./Accordion.constant";

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
      maxlength: "100",
      onPaste: true,
      placeholder: "",
      autocomplete: "off",
      disabled: false,
      alphanumeric: false,
      alphabetical: false,
      onlyNumbers: false,
      upperCase: false,
      pattern: "",
    },
    value: "",
    hasError: false,
    errorMessage: "",
  };
  
export const selectRequestEquivalenceStudy = {
    ...selectInit,
    name: 'selectEquivalenceRequest',
    textDefault: "*Institución donde realizaste tus estudios",
  };

  export const cancelBtnEquivalenceStudy = {
    ...ButtonInit,
    title: "Cancelar",
    type: "text",
    isExpand: true,
  };

  export const nextBtnEquivalenceStudy = {
    ...ButtonInit,
    title: "Continuar",
    type: "outlined",
    isExpand: true,
  };

  export const textareaEquivalenceStudy = {
    ...InputInit,
    data: {
      ...InputInit.data,
      type: "textarea",
      label: "Comentarios",
      name: "comments",
    },
  };

  export const inputEquivalenceStudyNum = {
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
    errorMessage: 'Se necesitan 10 caracteres numéricos'
  };
  
  export const backBtnEquivalenceStudy = {
    ...ButtonInit,
    title: "Atrás",
    type: "text",
    isExpand: true,
  };
  
  export const requestBtnEquivalenceStudy = {
    ...ButtonInit,
    title: "Solicitar",
    type: "outlined",
    isExpand: true,
  };

  export const feedbackNoticeEquivalenceStudy = {
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

  const uploadEquivalenceStudy = {
    title: "Selecciona el archivo",
    extensions: ".jpg, .png, .doc, .docx, .pdf",
    disabled: false,
  };

  export const uploadBirthCert = {
    ...uploadEquivalenceStudy,
    id: 'birthCert',
  }

  export const uploadSchoolCert = {
    ...uploadEquivalenceStudy,
    id:'schoolCert'
  }

  export const uploadEquivalenceCert = {
    ...uploadEquivalenceStudy,
    id: 'equivalenceCert'
  }

  export const uploadPreEquivalences = {
    ...uploadEquivalenceStudy,
    id: 'preEquivalences'
  }

  export const uploadSolicitudeEquivalences = {
    ...uploadEquivalenceStudy,
    id: 'solicitudeEquivalences'
  }

  export const maxSizeFileInEquivalenceStudy = 2000000;
  
  export const accordionItemsEquivalence = {
    items: [
      {
        title:'Equivalencia de bachillerato.',
        iconArrow: 'expand_more',
        content:`Deberás escanear completo, a color y por ambos lados los siguientes documentos:<ul ${listStyle.ul}><li ${listStyle.li}> Partida o acta de nacimiento apostillada.</li><li ${listStyle.li}> Certificado o notas de bachillerato apostillado, donde deben señalar los grados y ciclos escolares cursados.</li><li ${listStyle.li}> Diploma o título del nivel bachillerato.</li><li ${listStyle.li}> Notas o analítico de secundaria o educación básica.</li><li ${listStyle.li}> Diploma o título del nivel secundaria.</li><li ${listStyle.li}> Identificación oficial (Si el alumno es menor de edad, deberá presentar identificación oficial del padre o tutor.</li></ul>`,
        id: '1',
      },
      {
        title: 'Para equivalencia de estudios de educación superior',
        iconArrow: 'expand_more',
        content:
          `Deberás escanear completo, a color y por ambos lados los siguientes documentos:<ul ${listStyle.ul}><li ${listStyle.li}>  Acta de nacimiento. </li><li ${listStyle.li}> Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.</li><li ${listStyle.li}> Certificado total de estudios de nivel anterior inmediato.</li><li ${listStyle.li}> Título de nivel anterior inmediato.</li><li ${listStyle.li}> Identificación oficial.</li><li ${listStyle.li}> Carta poder.</li></ul>`,
        id: '2',
      },
    ],
  };