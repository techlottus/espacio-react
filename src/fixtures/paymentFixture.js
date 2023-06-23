const paymentBodyInit = {
  service: {
    id: "virtual-campus-payment-api",
    name: "Payment Service API",
  },
  data: [
    {
      transactionNumber: "7",
      conceptCode: "1005",
      conceptDescription: "COLEGIATURA ONLINE",
      periodCode: "202121",
      periodDescription: "Ciclo 21-1-1 OL",
      dueDate: "16-08-2021",
      balance: 100.0,
      canBeCancelled: false,
    },
    {
      transactionNumber: "8",
      conceptCode: "1120",
      conceptDescription: "CERT PARCIAL LIC Y MTR CETC",
      periodCode: "202121",
      periodDescription: "Ciclo 21-1-1 OL",
      dueDate: "16-08-2021",
      balance: 100.0,
      canBeCancelled: true,
    },
  ],
};

const errorPayment = {
  service: {
    id: "virtual-campus-payment-api",

    name: "Payment Service API",
  },

  info: {
    id: "103",

    info: "No se ha encontrado el cargo especificado para su cancelación",
  },

  error: {
    id: "404",

    info: "No trace for handled exception",
  },
};

export const paymentResponseConcepts = [
  {
    transactionNumber: "4",
    conceptCode: "PLAN",
    conceptDescription: "COLEGIATURA",
    periodCode: "202146",
    periodDescription: "DGETI  F21-M21",
    dueDate: "05-01-2021",
    balance: 1490,
    canBeCancelled: false,
  },
  {
    transactionNumber: "5",
    conceptCode: "PLAN",
    conceptDescription: "COLEGIATURA",
    periodCode: "202146",
    periodDescription: "DGETI  F21-M21",
    dueDate: "05-02-2021",
    balance: 1490,
    canBeCancelled: true,
  },
];
