import { texts } from "../texts/indexText";

const ButtonInit = {
  type: "primary",
  title: "",
  size: "small",
  icon: "",
  lyIcon: false,
  disabled: false,
  isExpand: false,
};

export const btnManualDownload = {
  ...ButtonInit,
  type: "outlined",
  icon: "download",
  title: "Manual",
};

export const btnPlayVideo = {
  ...ButtonInit,
  type: "outlined",
  icon: "play_circle_outline",
  lyIcon: true,
};

export const btnStudy = {
  ...ButtonInit,
  title: "Cursar",
  lyIcon: false,
  icon: "play_circle",
  type: "primary",
  disabled: false,
};

export const btnRemoveStudy = {
  ...ButtonInit,
  title: "Quitar",
  lyIcon: false,
  icon: "close",
  type: "text",
  disabled: false,
};

export const tabsSubjects = {
  size: "small",
  items: [
    {
      icon: "",
      title: "Materias por cursar",
      id: "1",
      disabled: false,
    },
    {
      icon: "",
      title: "Materias reprobadas",
      id: "2",
      disabled: false,
    },
    {
      icon: "",
      title: "Materias aprobadas",
      id: "3",
      disabled: false,
    },
  ],
  focus: "1",
};

export const selectSubjects = {
  items: [
    {
      title: "Área integral",
      iconArrow: "expand_circle_down",
      list: [
        // {
        //   value: '01',
        //   text: 'Teoría general de la Administración',
        //   iconMore: 'more_horiz',
        // },
        // {
        //   value: '02',
        //   text: 'artes',
        //   iconMore: 'more_horiz',
        // },
      ],
      id: "123",
      color: "#83B96C",
    },
    {
      title: "Área disciplinar",
      iconArrow: "expand_circle_down",
      list: [
        // {
        //   value: '01',
        //   text: 'derecho',
        //   iconMore: 'more_horiz',
        // },
        // {
        //   value: '02',
        //   text: 'artes',
        //   iconMore: 'more_horiz',
        // },
      ],
      id: "132",
      color: "#6286BF",
    },
    {
      title: "Área profesional",
      iconArrow: "expand_circle_down",
      list: [
        // {
        //   value: '01',
        //   text: 'derecho',
        //   iconMore: 'more_horiz',
        // },
        // {
        //   value: '02',
        //   text: 'artes',
        //   iconMore: 'more_horiz',
        // },
      ],
      id: "212",
      color: "#F6CE52",
    },
  ],
  wrapper: false,
};

export const cardButtonSubjects = {
  title: "Fundamentos de matemáticas",
  disabled: false,
};

export const cardAvailableSubject = {
  text: "Agregar una materia",
};

export const feedbackSubjects = {
  left: {
    name: "info",
    status: "normal",
  },
  type: "message",
  isTextEvent: false,
  textEvent: "close",
};

export const btnConfirmSubjects = {
  ...ButtonInit,
  title: "Confirmar materias",
  isExpand: true,
  type: "primary",
  size: "small",
};

export const feedbackModal = {
  left: {
    name: "info",
    status: "normal",
  },
  type: "alert",
  isTextEvent: false,
  textEvent: "Dismiss",
};

export const btnModalBack = {
  ...ButtonInit,
  title: "Regresar",
  type: "outlined",
};

export const btnModalContinue = {
  ...ButtonInit,
  title: "Continuar",
};

export const listTableSubject = {
  items: [
    {
      id: "1",
      icon: "add_circle",
      text: "Agregar materia",
    },
    {
      id: "2",
      icon: "help_outline",
      text: "Ver descripción",
    },
  ],
  id: "1",
};

export const btnEmptySubjects = {
  ...ButtonInit,
  title: "Volver a inicio",
  isExpand: false,
  type: "primary",
};
