import { types } from "../../types/types";

export const setDegreeInformationOnline = (info) => {
  return {
    type: types.procedureDegreeOnlineInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setDegreeInformationGraduate = (info) => {
  return {
    type: types.procedureDegreeGraduateInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setDataDegree = (data) => {
  return {
    type: types.procedureDegreeSetData,
    payload: {
      data: [
        ...data,
      ],
    },
  };
};

export const setDegreeDocument = (file) => {
  return {
    type: types.procedureDegreeDoc,
    payload: {
      document: file,
    },
  };
};

export const setDegreeDataOnline = (data) => {
  return {
    type: types.procedureDegreeOnlineData,
    payload: {
      data: {
        phone: data.phone || null,
        selectTypeProgramDegree: data.selectTypeProgramDegree || null,
        selectTypePaymentDegree: data.selectTypePaymentDegree || null,
      },
    },
  };
};

export const setDegreeDataGraduate = (data) => {
  return {
    type: types.procedureDegreeGraduateData,
    payload: {
      data: {
        phone: data.phone || null,
        selectTypeProgramDegree: data.selectTypeProgramDegree || null,
        selectTypePaymentDegree: data.selectTypePaymentDegree || null,
      },
    },
  };
};

export const setDegreeModalOnline = (data) => {
  return {
    type: types.procedureDegreeModalOnline,
    payload: {
      stepsDegreeOnlineRequirement: data,
    },
  };
};

export const setDegreeModalGraduate = (data) => {
  return {
    type: types.procedureDegreeModalGraduate,
    payload: {
      stepsDegreeGraduateRequirement: data,
    },
  };
};

export const setDegreeReset = () => {
  return {
    type: types.procedureDegreeReset,
    payload: {},
  };
};

export const setDegreeError = (typeError, isError, msg) => {
  return {
    type: types.procedureDegreeError,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg,
      },
    },
  };
};

export const setDegreeTypeId = (id) => {
  return {
    type: types.procedureDegreeSetTypeId,
    payload: {
      id,
    },
  };
};
