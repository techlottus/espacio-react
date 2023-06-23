
export const getTitleOfPayment = (path,titles) => {
  switch(path) {
    case "/payment/concept":
      return titles?.one;
    case "/payment/tax-data":
      return titles?.two;
    case "/payment/methods":
      return titles?.three;
    case "/payment/card-online":
      return titles?.four;
    default:
      return '';
  }
}