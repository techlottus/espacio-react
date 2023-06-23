import {
  stepsCardResume,
  typesPaymentMethods,
} from "../../../constants/Payment.constant";

export const getStepActionPayment = (
  stepCard,
  isToogle,
  history,
  selectMethod,
  handleIsModalPayment
) => {
  switch (stepCard) {
    case stepsCardResume.second:
      if (isToogle) {
        history.push("/payment/tax-data");
        return stepsCardResume.fourth;
      } else {
        history.push("/payment/methods");
        return stepsCardResume.five;
      }
    case stepsCardResume.fourth:
      history.push("/payment/methods");
      return stepsCardResume.five;
    case stepsCardResume.five:
      handleIsModalPayment(true);
      // if (selectMethod === typesPaymentMethods.online) {
      //   history.push('/payment/card-online')
      //   return stepsCardResume.six;
      // } else {
      //   return stepsCardResume.five;
      // }

      return stepsCardResume.five;

    case stepsCardResume.six:
      handleIsModalPayment(true);
      return stepsCardResume.six;
  }
};
