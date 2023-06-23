export const convertTypeToColor = (type) => {
  switch (type) {
    case "DEBIT":
      return "debit";
    case "PAID":
      return "paid";
    case "TO_PAY":
      return "topay";
    default:
      return '';
  }
};

export const convertPeriod = (type) => {
  switch (type) {
    case "PAST":
      return "Cursado";
    case "CURRENT":
      return "En curso";
    case "FUTURE":
      return "Por cursar";
    default:
        return '';
  }
};
