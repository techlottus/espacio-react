import { types } from "../../types/types"

export const setRequestInquiryProcedures = (request) => {
  return {
    type: types.proceduresSetRequestInquiry, 
    payload: {
      requestInquiryAll: [...request]
    }
  }
}

export const setErrorPocedures = (typeError, isError, msg) => {
  return {
    type: types.proceduresErrors,
    typeError,
    payload: {
      [typeError]: {
        isError,
        msg,
      },
    },
  };
};

export const setAllProcedures = (proceduresAllOne,proceduresAllTwo) => {
  return {
    type: types.proceduresSetAll, 
    payload: {
      proceduresAllOne: [...proceduresAllOne],
      proceduresAllTwo: [...proceduresAllTwo]
    }
  }

}

export const setProfileProcedures = (profile) => {
  return {
    type: types.proceduresSetProfile, 
    payload: {
      profile
    }
  }
}

export const resetProcedures = () => {
  return {
    type: types.proceduresReset, 
    payload: {}
  }
}

export const setPathExitProcedures = (pathExit) => {
  return {
    type: types.proceduresPathExit,
    payload: {
      pathExit
    }
  }
}

export const setProcedureAllExtra = (extra) => {
  return {
    type: types.proceduresSetExtraAll,
    payload:{
      extra:{
        cost: extra.cost || null,
        detailId: extra.detailId || null
      }
    }
  }
}
