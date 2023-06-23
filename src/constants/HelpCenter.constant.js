import { texts } from "../texts/indexText";

export const typeFlowHelpCenter = {
  academicHelp: "academic-help",
  technicalHelp: "technical-help",
  financialHelp: "financial-help",
  psychopedagogicalHelp: "psychopedagogical-help",
  proceduresHelp: "procedures-help",
};

export const breadcrumbFlowHelpCenter = {
  textColor: "white",
  textItems: [
    {
      value: "/",
      text: "Home",
    },
    {
      value: "/help-center/dashboard",
      text: "Centro de ayuda",
    },
    {
      value: "/help-center/flow/type",
      text: "Ayuda académica",
    },
  ],
  icon: "home",
};

export const buttonInit = {
  type: "primary",
  title: "",
  size: "small",
  icon: "",
  lyIcon: false,
  disabled: false,
  isExpand: true,
};

export const cardsTicket = [
  {
    title: "Pide una aclaración en tus calificaciones",
    path: "/help-center/flow/academic-form",
    actions: [
      {
        type: "button",
        path: "/help-center/flow/academic-form",
        configBtn: {
          ...buttonInit,
          type: "primary",
          lyIcon: true,
          icon: "add_circle",
          path: "/help-center/flow/academic-form",
        },
      },
    ],
    disabled: false,
  },
  {
    title: "Dar retroalimentación sobre profesores",
    actions: [
      {
        type: "button",
        configBtn: {
          ...buttonInit,
          type: "primary",
          lyIcon: true,
          icon: "add_circle",
        },
      },
    ],
    disabled: false,
  },
  {
    title: "Solicita una prórroga para entregar tus trabajos",
    actions: [
      {
        type: "button",
        configBtn: {
          ...buttonInit,
          type: "primary",
          lyIcon: true,
          icon: "add_circle",
        },
      },
    ],
    disabled: false,
  },
  {
    title: "Reporta un problema con los contenidos cargados en tu aula virtual",
    actions: [
      {
        type: "button",
        configBtn: {
          ...buttonInit,
          type: "primary",
          lyIcon: true,
          icon: "add_circle",
        },
      },
    ],
    disabled: false,
  },
];

export const btnFirstQuestion = {
  ...buttonInit,
  title: "Si",
  type: "outlined",
  size: "small",
  isExpand: true,
};
export const btnSecondQuestion = {
  ...buttonInit,
  title: "No",
  type: "outlined",
  size: "small",
  isExpand: true,
};
export const cardQuestionData = {
  title: "¿Te fue útil esta información?",
  disabled: false,
};

export const flowsHelpCenter = {
  academicHelp: {
    title: "Ayuda académica",
    bgImage: texts?.helpCenter.images.helpCenterFlowAcademic,
    breadCrumb: {
      ...breadcrumbFlowHelpCenter,
      textItems: [
        {
          value: "/",
          text: "Home",
        },
        {
          value: "/help-center/dashboard",
          text: "Centro de ayuda",
        },
        {
          value: "/help-center/flow/academic-help",
          text: "Ayuda académica",
        },
      ],
    },
    faqs: [
      {
        title: "¿Cuándo inician mis clases?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos:",
        list: [
          "Partida o acta de nacimiento apostillada.",
          "Certificado o notas de bachillerato apostillado, donde deben señalar los grados y ciclos escolares cursados.",
          "Diploma o título del nivel bachillerato.",
          "Notas o analítico de secundaria o educación básica",
          "Diploma o título del nivel secundaria",
          "Identificación oficial (Si el alumno es menor de edad, deberá presentar identificación oficial del padre o tutor.",
        ],
      },
      {
        title: "¿Cuál navegador es el indicado para acceder la aula virtual ? ",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title:
          "¿Hay una fecha límite para entregar mis actividades?, ¿Dónde puedo consultarla? ",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "Tuve un problema con un profesor ¿Qué puedo hacer?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "¿Dónde puedo consultar mis calificaciones y fechas de entrega?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
    ],
  },
  technicalHelp: {
    title: "Ayuda técnica",
    bgImage: texts?.helpCenter.images.helpCenterFlowTechnical,
    breadCrumb: {
      ...breadcrumbFlowHelpCenter,
      textItems: [
        {
          value: "/",
          text: "Home",
        },
        {
          value: "/help-center/dashboard",
          text: "Centro de ayuda",
        },
        {
          value: "/help-center/flow/type",
          text: "Ayuda técnica",
        },
      ],
    },
    faqs: [
      {
        title:
          "¿Que hago si olvidé mi usuario y contraseña para acceder a la plataforma online ? ",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos:",
        list: [
          "Partida o acta de nacimiento apostillada.",
          "Certificado o notas de bachillerato apostillado, donde deben señalar los grados y ciclos escolares cursados.",
          "Diploma o título del nivel bachillerato.",
          "Notas o analítico de secundaria o educación básica",
          "Diploma o título del nivel secundaria",
          "Identificación oficial (Si el alumno es menor de edad, deberá presentar identificación oficial del padre o tutor.",
        ],
      },
      {
        title: "¿Qué hacer si no he recibido mis accesos al campus digital?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "¿Cómo ingreso a la Biblioteca Virtual?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title:
          "¿Cuál es el tiempo límite para que caduque mi sesión si estoy inactivo en la plataforma? ",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title:
          "¿Cuál es la capacidad o tamaño límite de los archivos que puedo cargar?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
    ],
    tickets: [
      // {
      //   title: "Problemas con el uso de espacio UTC",
      //   actions: [
      //     {
      //       type: "button",
      //       configBtn: {
      //         ...buttonInit,
      //         type: "primary",
      //         lyIcon: true,
      //         icon: "add_circle",
      //       },
      //     },
      //   ],
      //   disabled: false,
      // },
      // {
      //   title:
      //     "Pide ayuda con el acceso o uso de correo electrónico y Office 365",
      //   actions: [
      //     {
      //       type: "button",
      //       configBtn: {
      //         ...buttonInit,
      //         type: "primary",
      //         lyIcon: true,
      //         icon: "add_circle",
      //       },
      //     },
      //   ],
      //   disabled: false,
      // },
      {
        title:
          "Apoyo con el uso de la biblioteca y las colecciones bibliográficas",
        actions: [
          {
            type: "button",
            configBtn: {
              ...buttonInit,
              type: "primary",
              lyIcon: true,
              icon: "add_circle",
            },
          },
        ],
        disabled: false,
        path:'/help-center/flow/technical-help/library-and-collections'
      },
      // {
      //   title: "Asistencia con el uso del aula virtual y sus contenidos",
      //   actions: [
      //     {
      //       type: "button",
      //       configBtn: {
      //         ...buttonInit,
      //         type: "primary",
      //         lyIcon: true,
      //         icon: "add_circle",
      //       },
      //     },
      //   ],
      //   disabled: false,
      // },
    ],
  },
  financialHelp: {
    title: "Ayuda financiera",
    bgImage: texts?.helpCenter.images.helpCenterFlowFinancial,
    breadCrumb: {
      ...breadcrumbFlowHelpCenter,
      textItems: [
        {
          value: "/",
          text: "Home",
        },
        {
          value: "/help-center/dashboard",
          text: "Centro de ayuda",
        },
        {
          value: "/help-center/flow/type",
          text: "Ayuda financiera",
        },
      ],
    },
    faqs: [
      {
        title: "¿Puedo registrar un RFC distinto para facturar?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos:",
        list: [
          "Partida o acta de nacimiento apostillada.",
          "Certificado o notas de bachillerato apostillado, donde deben señalar los grados y ciclos escolares cursados.",
          "Diploma o título del nivel bachillerato.",
          "Notas o analítico de secundaria o educación básica",
          "Diploma o título del nivel secundaria",
          "Identificación oficial (Si el alumno es menor de edad, deberá presentar identificación oficial del padre o tutor.",
        ],
      },
      {
        title: "¿Puedo emitir una factura despúes de realizar mis pagos?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "¿El monto de mis trámites escolares es deducible de impuestos?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "¿Donde puedo revisar las factuas emitidas en meses anteriores?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "¿Es necesario el CURP para solicitar una factura? ",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
    ],
    tickets: [
      {
        title: "Solicitud de aclaraciones con pagos",
        actions: [
          {
            type: "button",
            configBtn: {
              ...buttonInit,
              type: "primary",
              lyIcon: true,
              icon: "add_circle",
            },
          },
        ],
        disabled: false,
        path:'/help-center/flow/financial-help/payment-clarification'
      },
      {
        title: "Recupera factura",
        actions: [
          {
            type: "button",
            configBtn: {
              ...buttonInit,
              type: "primary",
              lyIcon: true,
              icon: "add_circle",
            },
          },
        ],
        disabled: false,

      },
    ],
  },
  psychopedagogicalHelp: {
    title: "Ayuda psicopedagógica",
    bgImage: texts?.helpCenter.images.helpCenterFlowPsychopedagogical,
    breadCrumb: {
      ...breadcrumbFlowHelpCenter,
      textItems: [
        {
          value: "/",
          text: "Home",
        },
        {
          value: "/help-center/dashboard",
          text: "Centro de ayuda",
        },
        {
          value: "/help-center/flow/type",
          text: "Ayuda psicopedagógica",
        },
      ],
    },
    faqs: [
      {
        title: "¿Qué tipo de servicios puedo obtener en este CAP?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos:",
        list: [
          "Partida o acta de nacimiento apostillada.",
          "Certificado o notas de bachillerato apostillado, donde deben señalar los grados y ciclos escolares cursados.",
          "Diploma o título del nivel bachillerato.",
          "Notas o analítico de secundaria o educación básica",
          "Diploma o título del nivel secundaria",
          "Identificación oficial (Si el alumno es menor de edad, deberá presentar identificación oficial del padre o tutor.",
        ],
      },
      {
        title: "¿Puede asistir al CAP alguien externo a la Universidad?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "Estoy sufriendo acoso / bullying ¿Con quién acudo?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title:
          "¿Si convivo con una persona que fue contagiado o está en condición vulnerable, debo regresar al presencial?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "¿Qué es la guía didáctica y para qué sirve?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
    ],
    tickets: [
      {
        title: "Consulta artículos, videos e infografías de nuestros expertos",
        actions: [
          {
            type: "button",
            configBtn: {
              ...buttonInit,
              type: "primary",
              lyIcon: true,
              icon: "add_circle",
            },
          },
        ],
        disabled: false,
        path:'https://www.google.com/'
      },
    ],
  },
  proceduresHelp: {
    title: "Ayuda en trámites y servicios",
    bgImage: texts?.helpCenter.images.helpCenterFlowProcedures,
    breadCrumb: {
      ...breadcrumbFlowHelpCenter,
      textItems: [
        {
          value: "/",
          text: "Home",
        },
        {
          value: "/help-center/dashboard",
          text: "Centro de ayuda",
        },
        {
          value: "/help-center/flow/type",
          text: "Ayuda en trámites y servicios",
        },
      ],
    },
    faqs: [
      {
        title:
          "¿Qué hago si tengo dudas después de la sesión en vivo o grabada con mi profesor?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos:",
        list: [
          "Partida o acta de nacimiento apostillada.",
          "Certificado o notas de bachillerato apostillado, donde deben señalar los grados y ciclos escolares cursados.",
          "Diploma o título del nivel bachillerato.",
          "Notas o analítico de secundaria o educación básica",
          "Diploma o título del nivel secundaria",
          "Identificación oficial (Si el alumno es menor de edad, deberá presentar identificación oficial del padre o tutor.",
        ],
      },
      {
        title: "¿Cuánto tiempo debo esperar para que corrijan mi calificación?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "¿Cómo sé cuáles son las materias que pueden ser equivalencias?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title:
          "¿Tienen algún costo la revalidación o equivalencia de las materias? ",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
      {
        title: "¿Cuáles son los requisitos para iniciar mi servicio social?",
        description:
          "Deberás escanear completo, a color y por ambos lados los siguientes documentos",
        list: [
          "Acta de nacimiento.",
          "Certificado parcial del nivel superior, donde deben señalar los grados y ciclos escolares cursados.",
          "Certificado total de estudios de nivel anterior inmediato.",
          "Título de nivel anterior inmediato.",
          "Identificación oficial.",
          "Carta poder.",
        ],
      },
    ],
    tickets: [
      {
        title: "Consulta el estatus de tus trámites",
        actions: [
          {
            type: "button",
            configBtn: {
              ...buttonInit,
              type: "primary",
              lyIcon: true,
              icon: "add_circle",
            },
          },
        ],
        disabled: false,
      },
      {
        title: "Apoyo para solicitar o dar seguimiento a un servicio escolar",
        actions: [
          {
            type: "button",
            configBtn: {
              ...buttonInit,
              type: "primary",
              lyIcon: true,
              icon: "add_circle",
            },
          },
        ],
        disabled: false,
        path:'/help-center/flow/procedures-help/support-school-service'
      },
      {
        title: "Solicita atención de otras áreas",
        actions: [
          {
            type: "button",
            configBtn: {
              ...buttonInit,
              type: "primary",
              lyIcon: true,
              icon: "add_circle",
            },
          },
        ],
        disabled: false,
        path:'/help-center/flow/procedures-help/other-areas-help-solicitude'
      },
      {
        title: "Quiero contactar a mi asesor",
        actions: [
          {
            type: "button",
            configBtn: {
              ...buttonInit,
              type: "primary",
              lyIcon: true,
              icon: "add_circle",
            },
          },
        ],
        disabled: false,
        path:'/help-center/flow/procedures-help/contact-advisor'
      },
    ],
  },
};

export const faqsHelpCenter = {
  title: "Preguntas Frecuentes",
  breadCrumb: {
    ...breadcrumbFlowHelpCenter,
    textItems: [
      {
        value: "/",
        text: "Home",
      },
      {
        value: "/help-center/dashboard",
        text: "Centro de ayuda",
      },
      {
        value: "/help-center/faqs",
        text: "Preguntas frecuentes",
      },
    ],
  },
  btns: [
    {
      ...buttonInit,
      id: "academic",
      title: "Academia",
      type: "primary",
      size: "small",
      isExpand: true,
    },
    // {
    //   ...buttonInit,
    //   id: "professors",
    //   title: "Profesores",
    //   type: "text",
    //   size: "small",
    //   isExpand: true,
    // },
    {
      ...buttonInit,
      id: "procedures",
      title: "Trámites",
      type: "text",
      size: "small",
      isExpand: true,
    },
    {
      ...buttonInit,
      id: "financial",
      title: "Pagos",
      type: "text",
      size: "small",
      isExpand: true,
    },
    // {
    //   ...buttonInit,
    //   id: "invoices",
    //   title: "Facturas",
    //   type: "text",
    //   size: "small",
    //   isExpand: true,
    // },
    {
      ...buttonInit,
      id: "technical",
      title: "Biblioteca",
      type: "text",
      size: "small",
      isExpand: true,
    },
  ],
};

export const searchResultsHelpCenter = {
  title: "Resultados de búsqueda",
  breadCrumb: {
    ...breadcrumbFlowHelpCenter,
    textColor: "brand",
    textItems: [
      {
        value: "/",
        text: "Home",
      },
      {
        value: "/help-center/dashboard",
        text: "Centro de ayuda",
      },
      {
        value: "/help-center/faqs",
        text: "Resultados de busqueda",
      },
    ],
  },
  tabs: {
    size: "small",
    items: [],
    focus: "",
  },
};

export const btnHelpCenterConfirmBack = {
  ...buttonInit,
  title: "",
  type: "text",
  size: "small",
  isExpand: true,
};

export const btnHelpCenterConfirmNext = {
  ...buttonInit,
  title: texts?.helpCenter.modalConfirmHelpCenter.success.btns.next,
  type: "primary",
  size: "small",
  isExpand: true,
};



