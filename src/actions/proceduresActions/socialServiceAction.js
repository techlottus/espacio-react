import { types } from "../../types/types"

export const setDataSocialServiceProcedures = (data) => {
  return {
    type: types.procedureSocialServiceData, 
    payload: {
      data
    }
  }
}

export const setErrorSocialServiceProcedures = (typeError, isError, msg) => {
  return {
    type: types.procedureSocialServiceError, 
    payload: {
      [typeError]: {
        isError,
        msg,
      },
    },
  }
}

export const setResetSocialServiceProcedures = () => {
  return {
    type: types.procedureSocialServiceReset, 
    payload: {}
  }
}

export const setSocialServiceInformation = (info) => {
  return {
    type: types.procedureSocialServiceInfo,
    payload: {
      information: {
        ...info,
      },
    },
  };
};

export const setSocialServiceTypeId = (id) => {
  return {
    type: types.procedureSocialServiceTypeId, 
    payload: {
      id
    }
  }
}
