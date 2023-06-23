
export const BtnPaymentValidator = (path,isCard) => {
  if(path === '/payment/card-online') {
    if(!isCard) {
      return true;
    }
  }

  return false;

}