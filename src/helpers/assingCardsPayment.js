import { typesOfCardsPayment } from "../constants/Payment.constant";
import { getImageOfAssets } from "./getImages";

export const assingCardImagePayment = (typeCard) => {
  switch(typeCard) {
    case typesOfCardsPayment.american.type:
      return getImageOfAssets(typesOfCardsPayment.american.img);
    case typesOfCardsPayment.diners.type:
      return getImageOfAssets(typesOfCardsPayment.diners.img);
    case typesOfCardsPayment.discover.type:
      return getImageOfAssets(typesOfCardsPayment.discover.img);
    case typesOfCardsPayment.master.type:
      return getImageOfAssets(typesOfCardsPayment.master.img);
    case typesOfCardsPayment.jcb.type:
      return getImageOfAssets(typesOfCardsPayment.jcb.img);
    case typesOfCardsPayment.visa.type:
      return getImageOfAssets(typesOfCardsPayment.visa.img);
    default:
      return getImageOfAssets(typesOfCardsPayment.unknown.img);
  }
}