import { typeflowsProcedures } from "../../../constants/Procedures.constant";
import { store } from "../../../store/store";

export const setInfoModalProcedure = (
  setIsModal,
  setInfoModal,
  dataStore,
  file,
  fileFormat,
  information,
  type,
  extra = null
) => {
  const { proceduresAllOne, proceduresAllTwo, profile } =
    store.getState().procedures;

  const content = [...proceduresAllOne, ...proceduresAllTwo];
  let cost = null;
  let detailId = null;
  if (extra) {
    cost = extra.cost;
    detailId = extra.detailId;
  }
  const contentPrice = Array.isArray(content)
    ? content.filter((price) => {
        return price.type === type || isTypeSocialService(type) === price.type;
      })
    : null;

  const priceModal = cost
    ? cost
    : contentPrice
    ? contentPrice[0]?.content.price
    : "";
  const titleModal = contentPrice ? contentPrice[0]?.title : "";
  setIsModal({
    valid: true,
    info: dataStore,
    file,
    type,
    detailId,
  });
  setInfoModal({
    profile,
    information,
    file: fileFormat,
    title: titleModal,
    cost: priceModal,
    detailId,
  });
};

const isTypeSocialService = (type) => {
  return (
    (typeflowsProcedures.elderOrIllSocialService === type ||
      typeflowsProcedures.ulaInstitutionSocialService === type ||
      typeflowsProcedures.governmentEmployee === type ||
      typeflowsProcedures.registerProgramorInstitute === type) &&
    typeflowsProcedures.socialService
  );
};
