import { types } from "../../types/types";

export const setReinstatementInformation = (info) => {
  return {
    type: types.procedureReinstatementInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setReinstatementData = (data) => {
  return {
    type: types.procedureReinstatementData,
    payload: {
      data: {
        comments: data.comments || null,
        phone: data.phone || null,
      },
    },
  };
};

export const setReinstatementReset = () => {
  return {
    type: types.procedureReinstatementReset,
    payload: {},
  };
};
