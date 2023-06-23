export const programsMock = [
    {
      programCode: "LEINSC334",
      programDescription: "ING.EN SISTEMA COMPUTACIONALES",
      periods: [
        {
          periodCode: "202042",
          periodDescription: "Ciclo 20-2 Ordinario Cua",
          startDate: "2020-02-04",
          endDate: "2020-05-20",
        },
        {
          periodCode: "202142",
          periodDescription: "Ciclo 21-2 Ordinario Cua",
          startDate: "2021-01-25",
          endDate: "2021-06-30",
        },
        {
          periodCode: "202143",
          periodDescription: "Ciclo 21-3 Ordinario Cua",
          startDate: "2021-05-24",
          endDate: "2021-09-08",
        },
      ],
    },
    {
      programCode: null,
      programDescription: null,
      periods: [
        {
          periodCode: "202042",
          periodDescription: "Ciclo 20-2 Ordinario Cua",
          startDate: "2020-02-04",
          endDate: "2020-05-20",
        },
        {
          periodCode: "202142",
          periodDescription: "Ciclo 21-2 Ordinario Cua",
          startDate: "2021-01-25",
          endDate: "2021-06-30",
        },
        {
          periodCode: "202143",
          periodDescription: "Ciclo 21-3 Ordinario Cua",
          startDate: "2021-05-24",
          endDate: "2021-09-08",
        },
      ],
    },
  ];
  
  export const formatProgramsMock = [
    { active: true, text: "Ing.en sistema computacionales", value: "LEINSC334" },
    { active: false, text: "", value: "" },
  ];
  
  export const filtersMock = [
    {
      text: "Ciclo 20-2 Ordinario Cua/04 Feb - 20 May / 2020",
      value: "202042",
      active: true,
    },
    {
      text: "Ciclo 21-2 Ordinario Cua/25 Ene - 30 Jun / 2021",
      value: "202142",
      active: false,
    },
    {
      text: "Ciclo 21-3 Ordinario Cua/24 May - 08 Sep / 2021",
      value: "202143",
      active: false,
    },
  ];
  
  export const movementsMock = {
    endDate: "2021-05-15",
    periodBalance: 2450,
    periodCode: "202242",
    periodDescription: "Ciclo 22-2 Ordinario Cua",
    periodType: "FUTURE",
    startDate: "2021-01-28",
    cards: [
      {
        code: "7",
        action: {
          type: "primary",
          title: "Pagar",
          size: "small",
          icon: "",
          lyIcon: false,
          disabled: false,
          isExpand: false,
        },
        date: "17 Octubre 2021",
        title: "Colegiatura online",
        color: "debit",
        text: "Saldo",
        price: 2405.5,
        rows: [
          {
            description: "Total de cargos",
            charge: 2405.5,
          },
          {
            description: "Pagado",
            charge: 0,
          },
          {
            description: "Descuentos",
            charge: 0,
          },
        ],
      },
      {
        code: "8",
        action: null,
        date: "27 Diciembre 2021",
        title: "Reposición credencial",
        color: "paid",
        text: "Saldo",
        price: 0,
        rows: [
          {
            description: "Total de cargos",
            charge: 225,
          },
          {
            description: "Pagado",
            charge: 225,
          },
          {
            description: "Descuentos",
            charge: 0,
          },
        ],
      },
    ],
  };