import env from "../enviroment/environment";

export const breadcrumbDashboardHelpCenter = {
  iconColor: "#e14504",
  itemFocusColor: "#e14504",
  textItems: [
    {
      value: "/",
      text: "Home",
    },
    {
      value: "/help-center/dashboard",
      text: "Centro de ayuda",
    },
  ],
  icon: "home",
};

export const searchHelpCenterDashboard = {
  type: "text",
  typeSearch: "shadow",
  alphabetical: true,
  placeholder: "Buscar",
  autocomplete: "off",
  upperCase: false,
  icon: "search",
  size: "medium",
};

export const cardImageHelpCenterDashboard = [
  {
    path: "/help-center/flow/academic-help",
    id: "academic-help",
    disabled: false,
    hover: true,
    img: "https://campusvirtual.azureedge.net/public/assets/images/banner-ayuda-academica.png",
    title: "Ayuda académica",
    text: "Aclaraciones de calificaciones, profesores, trabajos, materias y solicita prórrogas",
  },
  {
    path: "/help-center/flow/technical-help",
    id: "technical-help",
    disabled: false,
    hover: true,
    img: "https://campusvirtual.azureedge.net/public/assets/images/banner-ayuda-tecnica.png",
    title: "Ayuda técnica",
    text: "Resuelve dificultades de accesos, conexión, biblioteca y fallas en plataforma",
  },
  {
    path: "/help-center/flow/financial-help",
    id: "financial-help",
    disabled: false,
    hover: true,
    img: "https://campusvirtual.azureedge.net/public/assets/images/banner-ayuda-financiera.png",
    title: "Ayuda financiera",
    text: "Asistencia para realizar pagos, descargar facturas y aclaraciones de pagos",
  },
  {
    path: "/help-center/flow/psychopedagogical-help",
    id: "psychopedagogical-help",
    disabled: false,
    hover: true,
    img: "https://campusvirtual.azureedge.net/public/assets/images/banner-ayuda-psicometrica.png",
    title: "Ayuda psicopedagógica",
    text: "Tip's para el aprendizaje, concentración, relajación y salud emocional ",
  },
  {
    path: "/help-center/flow/procedures-help",
    id: "procedures-help",
    disabled: false,
    hover: true,
    img: "https://campusvirtual.azureedge.net/public/assets/images/banner-ayuda-tramites.png",
    title: "Ayuda en trámites y servicios",
    text: "Dudas y aclaraciones sobre realizar o dar seguimiento a trámites y servicios escolares",
  },
  {
    path: "/help-center/faqs",
    id: "faqs",
    disabled: false,
    hover: true,
    img: "https://campusvirtual.azureedge.net/public/assets/images/banner-preguntas-frecuentes.png",
    title: "Preguntas frecuentes",
    text: "Consulta las soluciones más comunes a las dificultades de la comunidad",
  },
];
 
export const cardsItemHelpCenterDashboard = [
  {
    icon: "search",
    title: "Consulta de tickets",
    text: "Revisa el estado y da seguimiento de los tickets que has levantado",
    disabled: false,
    isContent: true,
    withOutShadow: true,
  },
  {
    path: "/help-center/directory",
    icon: "email",
    title: "Directorio de Contacto",
    text: "Conoce los equipos que pueden solucionar tus dificultades",
    disabled: false,
    isContent: true,
    withOutShadow: true,
  },
  {
    urlOpenOut: env && env.violettaLink ? env.violettaLink : null,
    icon: "chat_bubble_outline",
    title: "Violetta",
    text: "¿Quieres saber cómo construir relaciones sanas? Chatea con Violetta",
    disabled: false,
    isContent: true,
    withOutShadow: true,
  },
];

export const btnCircleHelpCenterDashboard = {
  size: "small",
  icon: "question_mark",
  disabled: false,
  id: "",
};

export const labelHelpCenterDashboard = {
  id: "",
  type: "outlined",
  title: "¿Todo bien?",
  size: "medium",
  disabled: false,
};

